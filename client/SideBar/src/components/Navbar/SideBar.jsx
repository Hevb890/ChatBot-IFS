import React, { useEffect } from 'react'
import Avatar from './Avatar'
import BackHomeButton from './BackHomeButton'
import NewChatButton from './NewChatButton'
import ProfileStatus from './ProfileStatus'
import RecentChatTab from './RecentChatTab'
import './SideBar.css'
import axios from 'axios'

export default function SideBar({selectedChatId, setSelectedChatId, setSelectedChatMessages, setModalOpen, setRecentChats, recentChats}) {
  //Adding Recent Chats
  // const [recentChats, setRecentChats] = useState([]);

  //Opening Modal
  const handleClick = async () => {
    setModalOpen(true)
  };

  //Handling Recent Chat Tab 
  const handleRecentChatTabClick = async(chatId) => {
    setSelectedChatId(chatId)
    console.log("Recent Chat ID:", chatId);
    const response = await axios.post('http://127.0.0.1:8080/selectRecentChat', { data: chatId });
    const messagesResponse = await axios.post('http://127.0.0.1:8080/getMessages');
    const messages = messagesResponse.data;
    setSelectedChatMessages(messages)
  }

  //Getting recent Chats
  useEffect(() => {
    const getRecentChats = async() => {
      try{
        const response = await axios.get('http://127.0.0.1:8080/getRecentChats')
        setRecentChats(response.data)
      }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    }

    getRecentChats()
  },[])

  return (
    <div className='main-container'>
      <div className='side-bar-main'>
        <div className='sidebar-section-2'>
            <NewChatButton onClick={handleClick} />
            <p className='recent-chat-section-para'>Recent</p>
            <div className='recent-chat-section'>
                
                {recentChats.map(chat => (
                <RecentChatTab key={chat._id} chat={{...chat, id: chat._id}} onClick={() => handleRecentChatTabClick(chat._id)} isSelected={chat._id==selectedChatId}/>
            ))}
            </div>
        </div>
        <div className='sidebar-section-3'>
            <BackHomeButton />
            <div className='profile'>
                <Avatar />
                <ProfileStatus />
            </div>
        </div>
      </div>
    </div>
  )
}
