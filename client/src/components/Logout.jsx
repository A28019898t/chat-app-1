import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi'

const Button = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #9a8;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`;

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    )
}

export default Logout