import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/Bot4.gif'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;

    .logo {
        img {
            width: 25rem;
            height: 25rem;
            object-fit: none;
            border-radius: 50%;
        }
    }
    span {
        color: #4e0eff;
    }
`;

const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <div className='logo'>
                <img src={Robot} alt="robot" />
            </div>
            <h1>
                Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Please select a chat to Start Messaging.</h3>
        </Container>
    )
}

export default Welcome