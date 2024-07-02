import React, { useState } from 'react';
import Chatbox from './components/Navbar/Chatbox';
import Navbar from './components/Navbar/Navbar';
import SideBar from './components/Navbar/SideBar';
import Modal from './components/Navbar/Modal/Modal';
import './App.css';

const App = () => {
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChatMessages, setSelectedChatMessages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [recentChats, setRecentChats] = useState([]);
    const [chatName, setChatName] = useState('')
    

    return (
        <div className={modalOpen ? 'container blur' : 'container'}>
            <Navbar className='navbar' />
            <div className='container-01'>
                <SideBar
                    selectedChatId={selectedChatId}
                    setSelectedChatId={setSelectedChatId}
                    setSelectedChatMessages={setSelectedChatMessages}
                    setModalOpen={setModalOpen}
                    setRecentChats={setRecentChats}
                    recentChats={recentChats}
                />
                <Chatbox initialMessages={selectedChatMessages} selectedChatId={selectedChatId} />
            </div>
            {modalOpen && (
                <div className='modal-overlay'>
                    <Modal 
                    setModalOpen={setModalOpen} 
                    setChatName={setChatName} 
                    chatName={chatName}
                    setRecentChats={setRecentChats}
                    recentChats={recentChats}
                    setSelectedChatId={setSelectedChatId}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
