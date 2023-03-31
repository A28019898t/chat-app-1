import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { addMessage, getAllMessage } from '../ultils/APIRoutes';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Message from './Message';

const Container = styled.div`
     padding-top: 1rem;
     display: grid;
     gap: 0.1rem;
     overflow: hidden;
     grid-template-rows: 10% 78% 12%;
     @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }

     .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    width: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
     }

     .chat-message {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        padding: 1rem 2rem;
        
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .message {
            display: flex;
            align-items: center;
            .content {
                display: inline-block;
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
                p {
                    color: white; 
                }
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .received {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
     }
`;

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const handleSendMessage = async (message) => {
        const { data } = await axios.post(addMessage, {
            message,
            from: currentUser._id,
            to: currentChat._id
        });

        if (data?.response) {
            socket.current.emit('send-msg', {
                to: currentChat._id,
                from: currentUser._id,
                message: message
            });

            setMessages([...messages, data.response]);
        }

    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', message => {
                setArrivalMessage({ fromSelf: false, message })
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if (currentChat && currentUser) {
            const getMessage = async () => {
                const { data } = await axios.post(getAllMessage, {
                    from: currentUser._id,
                    to: currentChat._id
                });

                console.log({ data });
                setMessages(data.projectMessage);
            }

            getMessage();
        }
    }, [currentChat]);

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt="avatar"
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div ref={scrollRef} className='chat-message'>
                {
                    messages?.length
                        ? messages.map((message) => (
                            <div key={message.id} className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        )) : ''
                }
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container >
    )
}

export default ChatContainer;