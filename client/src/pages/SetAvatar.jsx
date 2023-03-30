import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import buffer from 'buffer/';
import Loader from '../assets/loader.gif'
import { setAvatarRoute } from '../ultils/APIRoutes';
import { loginRoute } from './../ultils/APIRoutes';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 3rem;
   background-color: #131324;
   height: 100vh;
   width: 100vw;

   .Loader {
    max-inline-size: 100%;
   }

   .titleContainer {
        h1 {
            color: white;
        }
   }

   .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            img {
                width: 6rem;
            }
        }

        .selected {
            border: 0.4rem solid #4e0eff;
        }
   }

   button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
        background-color: #4e0eff;

        }
    }
`;

const SetAvatar = () => {

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const api = 'https://api.multiavatar.com/45678945';

    const Buffer = buffer.Buffer;
    const navigate = useNavigate();

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        }
    }, []);

    const handleSetProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                avatarImage: avatars[selectedAvatar]
            });

            console.log(data);

            if (data.status) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.avatarImage;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate('/');
            } else {
                toast.error('Error setting avatar. Please try again');
            }
        }
    }

    useEffect(() => {
        let avatarsImage = [];
        const getAvatar = async (api, number) => {
            for (let i = 0; i < number; i++) {
                const randomNumber = Math.round(Math.random() * 1000)
                const { data } = await axios.get(`${api}/${randomNumber}`);
                const buffImage = new Buffer(data);
                const base64Image = buffImage.toString('base64');

                avatarsImage = [...avatarsImage, base64Image];
            }
            setAvatars(avatarsImage);
            setIsLoading(false);
        }

        getAvatar(api, 2);
    }, []);

    useEffect(() => {
        if (selectedAvatar !== undefined) {
            const user = JSON.parse(localStorage.getItem('chat-app-user'));
            console.log({ user });
        }
    }, [selectedAvatar])

    console.log({ avatars });

    return (
        <>
            {
                isLoading
                    ? <Container><img className='loader' src={Loader} alt="Loader" /></Container>
                    : <Container>
                        <div className='titleContainer'>
                            <h1>Pick an avatar as your profile picture</h1>
                        </div>
                        <div className='avatars'>
                            {
                                avatars?.length
                                    ? avatars.map((avatar, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`avatar ${selectedAvatar === index ? 'selected' : ''
                                                    }`}
                                            >
                                                <img
                                                    src={`data:image/svg+xml;base64,${avatar}`}
                                                    alt="avatar"
                                                    onClick={() => setSelectedAvatar(index)}
                                                />
                                            </div>)
                                    })
                                    : <img className='loader' src={Loader} alt="Loader" />
                            }
                        </div>
                        <button className='submit-btn' onClick={handleSetProfilePicture}>Set as ProfilePicture</button>
                    </Container>
            }
            <ToastContainer />
        </>
    )
}

export default SetAvatar