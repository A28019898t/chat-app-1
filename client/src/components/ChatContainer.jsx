import React from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
import Message from './Message';

const Container = styled.div`
     padding-top: 1rem;
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
`;

const ChatContainer = ({ currentChat }) => {

    const handleSendMessage = (message) => {
        console.log({ message });
    }
    console.log('[ChatContainer] re-render');

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
            <Message />
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
    )
}

export default ChatContainer;