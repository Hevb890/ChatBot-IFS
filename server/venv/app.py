import llm
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

mongo_url = "mongodb://localhost:27017"
client = MongoClient(mongo_url)

db_chatbot = client['Chatbot']
collection_recent_chats = db_chatbot['Recent\Chats']
collection_users = db_chatbot[r'Chat\Users']
collection_conversations = db_chatbot['Conversations']

i = 0
answer = ''
selected_recent_chat_id = ''


@app.route('/api/submit', methods=['POST'])
def submit():
    global answer
    chat_history = []
    data = request.json.get('data')
    selected_recent_chat_id = request.json.get('chatId')
    recent_chats = collection_recent_chats.find_one(
        {"_id": ObjectId(selected_recent_chat_id)})

    # create chat history list
    if recent_chats and 'conversations' in recent_chats:
        messages_ids = recent_chats['conversations']
        messages = collection_conversations.find(
            {"_id": {"$in": messages_ids}})

        for message in messages:
            message['_id'] = str(message['_id'])
            chat_history.append(
                {'id': message['_id'], 'question': message['question'], 'answer': message['answer']})

    answer = llm.generate_answer(data, chat_history)
    message = {"question": data, "answer": answer}
    collection_conversations.insert_one(message)
    conversation_id = message["_id"]
    # fetch recent chat document
    recent_chats = collection_recent_chats.find_one(
        {"_id": ObjectId(selected_recent_chat_id)})

    if recent_chats:
        # if conversations array is null rename the recent chat
        if recent_chats['conversations'] is None:
            new_chat_name = f"{data}"
            print(new_chat_name)
            collection_recent_chats.update_one(
                {"_id": ObjectId(selected_recent_chat_id)},
                {"$set": {"name": new_chat_name}}
            )
        collection_recent_chats.update_one(
            {"_id": ObjectId(selected_recent_chat_id)},
            {"$push": {"conversations": ObjectId(conversation_id)}}
        )
    print(f"Received data: {answer}")
    if answer != '':
        return jsonify({"answer": answer})
    else:
        return jsonify({"answer": "No answer available"}), 404


@app.route('/data', methods=['GET'])
def get_user_data():
    data = collection_users.find()

    result = []
    for document in data:
        document['_id'] = str(document['_id'])
        result.append(document)

    return jsonify(result[1]["name"])

# Creating Recent Chats


@app.route('/create_recent_chats', methods=['POST'])
def create_recent_chats():
    recentChatName = request.json.get('data')
    current_time = datetime.utcnow()
    data = collection_users.find()
    result = []
    for document in data:
        document['_id'] = str(document['_id'])
        result.append(document)
    user_id = result[1]["_id"]

    recent_chat = {"name": f"{recentChatName}",
                   "user_id": f"{user_id}", "created_at": f"{current_time}",
                   "conversations": []}
    collection_recent_chats.insert_one(recent_chat)
    recent_chat_id = recent_chat["_id"]
    collection_users.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"recent_chats": recent_chat_id}}
    )
    print(recent_chat_id)
    return jsonify({"_id": str(recent_chat_id), "name": recent_chat['name']})

# Sending recent chats


@app.route('/getRecentChats', methods=['GET'])
def get_recent_chats():
    user_data = collection_users.find_one({"name": "Sandeepa Dilshan"})
    if user_data and 'recent_chats' in user_data:
        recent_chat_ids = user_data['recent_chats']
        recent_chats = collection_recent_chats.find(
            {"_id": {"$in": recent_chat_ids}})
        result = []
        for chat in recent_chats:
            chat['_id'] = str(chat['_id'])
            result.append({'_id': chat['_id'], 'name': chat['name']})
        return jsonify(result)
    else:
        return jsonify([])


@app.route('/selectRecentChat', methods=['POST'])
def select_recent_chat():
    global selected_recent_chat_id
    selected_recent_chat_id = request.json.get('data')
    print(selected_recent_chat_id)
    return selected_recent_chat_id


@app.route('/getMessages', methods=['POST'])
def get_messages():
    global selected_recent_chat_id
    recent_chat = collection_recent_chats.find_one(
        {"_id": ObjectId(selected_recent_chat_id)})
    if recent_chat and 'conversations' in recent_chat:
        messages_ids = recent_chat['conversations']
        messages = collection_conversations.find(
            {"_id": {"$in": messages_ids}})
        result = []
        for message in messages:
            message['_id'] = str(message['_id'])
            result.append(
                {'id': message['_id'], 'question': message['question'], 'answer': message['answer']})
        return jsonify(result)
    else:
        return jsonify([])


if __name__ == '__main__':
    app.run(debug=True, port=8080)
