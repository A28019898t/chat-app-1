import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Logo from '../assets/react.svg'

const Container = styled.div`
    display: grid;
    background-color: #080420;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;

    .branch {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img {
            width: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

       .contact {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            display: flex;
            align-items: center;
            transition: 0.5s ease-in-out;

            img {
                width: 3rem;
            }
            .username {
                h3 {
                    color: white;
                }
            }
       }

       .selected {
            background-color: #9186f3;
       }
    }

    .current-user {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        background-color: #0d0d30;

        .avatar {
            img {
                width: 4rem;
                max-inline-size: 100%
            }
        }

        .username {
            h2 {
                color: white;
            }
        }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
            h2 {
                font-size: 1rem;
            }
        }
    }
`;

const Contact = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserAvatar, setCurrentUserAvatar] = useState('');
    const [currentUserSelected, setCurrentUserSelected] = useState();

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username);
            setCurrentUserAvatar(currentUser.avatarImage);
            console.log(currentUser.avatarImage);
        }
    }, [currentUser, contacts]);

    const changeCurrentChat = (index, contact) => {
        setCurrentUserSelected(index);
        changeChat(contact);
    }

    return (
        <Container>
            <div className="branch">
                <img src={Logo} alt="Logo" />
                <h3>snappy</h3>
            </div>
            <div className="contacts">
                {contacts?.length
                    // ? <h1>'contacts'</h1>
                    ? contacts.map((contact, index) => (
                        <div
                            key={index}
                            className={`contact ${currentUserSelected === index ? 'selected' : ''}`}
                            onClick={() => changeCurrentChat(index, contact)}
                        >
                            <img
                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                alt="avatar"
                            />
                            <div className="username">
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    ))
                    : ''
                }
            </div>
            <div className="current-user">
                <div className="avatar">
                    <img
                        src={`data:image/svg+xml;base64,${currentUserAvatar}`}
                        alt="avatar"
                    />
                </div>
                <div className="username">
                    <h2>{currentUserName}</h2>
                </div>
            </div>
        </Container>
    )
}

export default Contact