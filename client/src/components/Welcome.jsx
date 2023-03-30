import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;

    img {
        width: 20rem;
    }
    span {
        color: #4e0eff;
    }
`;

const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <img src={Robot} alt="robot" />
            <h1>
                Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Please select a chat to Start Messaging.</h3>
        </Container>
    )
}

export default Welcome