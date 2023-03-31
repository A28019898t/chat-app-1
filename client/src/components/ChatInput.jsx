import React, { useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                bottom: 42px;
                --epr-bg-color: #080420;
                --epr-category-label-bg-color: #080420;
                --epr-search-input-bg-color: transparent;
                --epr-search-input-text-color: white;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9186f3;
                .epr-body::-webkit-scrollbar {
                        background-color: #080420;
                        width: 4px;
                        &-thumb {
                            background-color: #9186f3;
                            border-radius: 2rem;
                        }
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 1.4rem;
        display: flex;
        align-items: center;
        background-color: #ffffff32;
        gap: 2rem;

        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 1.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            cursor: pointer;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                }
            }
            svg {
                font-size: 1.8rem;
                color: white;
            }   
        }

    }

`;

const ChatInput = ({ handleSendMessage }) => {
    const [showEmojiPicker, setEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmojiClick = (emoji, event) => {

        setMessage(message => {
            return `${message}${emoji.emoji}`;
        });
    }

    const handleOnchangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (message?.length > 0) {
            setEmojiPicker(false);
            handleSendMessage(message);
            setMessage('');
        }
    }

    console.log('[ChatInput] re-render');
    return (
        <Container>
            <div className="button-container">
                <div
                    className="emoji"
                >
                    <BsEmojiSmileFill onClick={() => setEmojiPicker(!showEmojiPicker)} />
                    {
                        showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />
                    }
                </div>
            </div>
            <form className='input-container' onClick={handleOnSubmit}>
                <input
                    type='text'
                    placeholder='Type your message here'
                    value={message}
                    onChange={handleOnchangeMessage}
                />
                <button
                    className='submit'
                    type='submit'
                >
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

export default ChatInput