import React, { useState, useEffect } from 'react';
import './Chatbox.css';
import GeneratedMessage from './GeneratedMessage';
import InputMessage from './InputMessage';
import Message from './Message';
import axios from 'axios';
import ChatBotLogo from '../../assets/ChatBotLogo.png'

export default function Chatbot({ initialMessages, selectedChatId }) {
    const [userMessage, setUserMessage] = useState(null);
    const [generatedMessage, setGeneratedMessage] = useState(null);
    const [messages, setMessages] = useState(initialMessages || []);

    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    const handleNewMessage = async (newMessage) => {
        setUserMessage(newMessage);
        try {
            const submitResponse = await axios.post('http://127.0.0.1:8080/api/submit', { data: newMessage, chatId: selectedChatId });
            setGeneratedMessage(submitResponse.data.answer);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        if (userMessage && generatedMessage) {
            const recentChatMessages = { _id: messages.length + 1, question: userMessage, answer: generatedMessage };
            setMessages(prevMessages => [...prevMessages, recentChatMessages]);
            setUserMessage(null);
            setGeneratedMessage(null);
        }
    }, [generatedMessage]);

    return (
        <div className='mainBox'>
            <div className='chatBoxWrap'>
                {messages.map(msg => (
                    <div className='messagesSectionWrap' key={msg._id}>
                        <Message message={msg.question} />
                        <GeneratedMessage generatedMessage={msg.answer} />
                    </div>
                ))}
            </div>
            <div className='input-section'>
                <InputMessage onNewMessage={handleNewMessage} />
            </div>
        </div>
    );
}
