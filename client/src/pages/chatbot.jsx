import React, { useState, useEffect, useRef } from 'react';
import './../style/chat.css'; // Import CSS file for styling
import robotIcon from "../images/robot-solid.svg";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const initialBotMessageSent = useRef(false);

    useEffect(() => {
        if (!initialBotMessageSent.current) {
            setMessages(prevMessages => [...prevMessages, { text: 'Hello! I\'m PAT, your patent comparison assistant. Please upload your patent document so I can compare it with others related to yours. Let\'s get started!', sender: 'bot', avatar: 'bot-avatar.png' }]);
            initialBotMessageSent.current = true;
        }
    }, []);

    const handleMessageSend = () => {
        if (newMessage.trim() === '') return;
        setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
        setNewMessage('');

        // Simulate typing indicator
        setMessages(prevMessages => [...prevMessages, { text: '...', sender: 'bot', typing: true }]);

        // Simulate bot response
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages.slice(0, -1), // Remove the typing indicator
                { text: 'Hello!', sender: 'bot', avatar: 'bot-avatar.png' }
            ]);
        }, 1000);
    };


    return (
        <div className="flex flex-col border border-gray-700 rounded-lg shadow-lg p-4 mr-7" style={{ height: '42rem' }}>
            <div className="chat-header">
                Talk to PAT
                <hr className="header-divider" />
            </div>
            <div className="flex flex-col h-full overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}>
                        {message.sender === 'bot' && message.avatar && (
                            <img src={robotIcon} alt="Bot Avatar" className="avatar mb-5" />
                        )}
                        <div className="message-text ml-2">{message.text}</div>
                    </div>
                ))}
            </div>
            <div className="flex mt-2 ml-2"> {/* Added ml-2 for left margin */}
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow px-2 py-1 rounded-l-md border border-gray-300 focus:outline-none"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleMessageSend}
                    className="px-4 py-1 bg-gray-700 text-white rounded-r-md hover:bg-gray-500 focus:outline-none"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
