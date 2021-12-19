import React from 'react'
import Lottie from 'react-lottie';
import styled, { keyframes } from 'styled-components'
import warning from '../assets/lottie/warning.json'
import error from '../assets/lottie/error.json'
import success from '../assets/lottie/success.json'

const fadeDown = keyframes`
 0%{
     transform: translateY(-20px);
 }

 100% {
     opacity: 1;
     transform: translateY(0)
 }
`;

const Container = styled.div`
    position: absolute;
    padding: 5px 10px;
    background-color: white;
    box-shadow: 0 0 5px 1px rgba(0,0,0,.2);
    top: 10px;
    right: 20px;
    border-radius: 5px;
    opacity: 0;
    animation: ${fadeDown} 1s forwards;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const Message = styled.p`
    font-size: 14px;
    flex: 1;
    margin: 0 5px;
`;



const Toast = ({ message, type }) => {
    const types = { error, warning, success };
    return (
        <Container>
            <div>
                <Lottie
                    options={{ animationData: types[type] }}
                    height={45}
                />
            </div>
            <Message>{message}</Message>

        </Container>
    )
}

export default Toast
