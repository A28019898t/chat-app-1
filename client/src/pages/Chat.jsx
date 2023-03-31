import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUserRoute, host } from '../ultils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client'

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #131324;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

const Chat = () => {
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('chat-app-user'));
        if (!user) {
            navigate('/login');
        } else {
            console.log({ user });
            setCurrentUser(user);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit('add-user', currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const getContact = async (api) => {
                    const { data } = await axios.get(api);
                    console.log('[ALL USERS]', data.allUser);
                    setContacts(data.allUser)
                }

                console.log({ currentUser });

                getContact(`${allUserRoute}/${currentUser._id}`);
            } else {
                navigate('/setAvatar');
            }
        }

    }, [currentUser]);

    const handelChatChange = (chat) => {
        setCurrentChat(chat);
    }

    console.log('re-render');

    return (
        <>
            <Container>
                <div className="container">
                    <Contact
                        contacts={contacts}
                        currentUser={currentUser}
                        changeChat={handelChatChange}
                    />
                    {
                        !isLoading && currentChat === undefined
                            ? <Welcome currentUser={currentUser} />
                            : currentChat
                                ? <ChatContainer
                                    currentChat={currentChat}
                                    currentUser={currentUser}
                                    socket={socket} />
                                : ''
                    }
                </div>
            </Container>
        </>
    )
}

export default Chat