import React from 'react';
import axios from 'axios';
import './Modal.css';

export default function Modal({ setModalOpen, setRecentChats, setSelectedChatId, setChatName, chatName, recentChats }) {
  const handleChange = (event) => {
    setChatName(event.target.value);
  };

  // Submitting New Name
  const submitNewChatName = async (event) => {
    event.preventDefault();
    try {
      const newChatResponse = await axios.post('http://127.0.0.1:8080/create_recent_chats', { data: chatName });
      const newChat = { _id: newChatResponse.data._id, name: newChatResponse.data.name };
      setRecentChats([...recentChats, newChat]);
      setSelectedChatId(newChatResponse.data._id);
      setChatName('');
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Closing Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='mainWrapModel'>
      <div className='formModal'>
        <form onSubmit={submitNewChatName} method="POST">
          <p>New Chat Name</p>
          <input
            type="text"
            placeholder='Chat Name'
            value={chatName}
            onChange={handleChange}
          />
          <button type='submit' className='button-6'>Submit</button>
          <button type='button' className='button-6' onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
}
