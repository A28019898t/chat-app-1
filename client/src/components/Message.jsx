import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
    height: 90%;
`;

const Message = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Message