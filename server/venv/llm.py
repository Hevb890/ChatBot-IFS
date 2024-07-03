import os
from langchain_community.vectorstores import DeepLake
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.messages import AIMessage, HumanMessage
load_dotenv()


os.environ['ACTIVELOOP_TOKEN'] = "Active_Loop_API_Key"
dataset_path = "hub://hevindu/project"

llm = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0)

contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)

contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)


system_prompt = (
    "You are an assistant for the IFS community page Chatbot."
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer. say that you"
    "don't know and it is out of context."
    "\n\n"
    "{context}"
)

qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)
chat_history = []


def get_chat_history(chat_list):
    for chat in chat_list:
        chat_history.extend(
            [
                HumanMessage(content=chat['question']),
                AIMessage(content=chat['answer'])
            ]
        )
    return chat_history


def load_similar_documents():
    vector_store = DeepLake(dataset_path=dataset_path,
                            read_only=True, embedding=OpenAIEmbeddings())
    print(vector_store)
    retriever = vector_store.as_retriever()
    return retriever


def generate_answer(question, chat_list):
    retriever = load_similar_documents()

    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_q_prompt
    )

    chain = create_stuff_documents_chain(llm, qa_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, chain)

    chat_history = get_chat_history(chat_list)

    llm_msg = rag_chain.invoke(
        {"input": question, "chat_history": chat_history})

    return llm_msg['answer']
