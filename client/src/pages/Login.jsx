import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../assets/react.svg'
import { loginRoute } from '../ultils/APIRoutes';

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #2E4F4F;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 4rem;
        }
        h1{
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #2C3333;
        border-radius: 2rem;
        padding: 2rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem; 

            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
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

        span {
            color: white;

            a {
                color: #4e00ff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

const Login = () => {

    const [value, setValue] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);

    const handelOnchange = (e) => {
        console.log({ [e.target.name]: e.target.value });
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const handleValidation = () => {
        const { username, password } = value;

        if (!username || !password) {
            toast.error('Username and password are required!', toastOptions);
            return false;
        }

        if (username.length < 3) {
            toast.error('Username should be more than 3 characters!', toastOptions);
            return false;
        }
        if (password.length < 8) {
            toast.error('Password should be more than 8 characters!', toastOptions);
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('[Login Value]', value);

        const { username, password } = value;

        if (handleValidation()) {
            const { data } = await axios.post(loginRoute, {
                username,
                password
            });

            if (data) {
                console.log(data.user);

                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/');
            } else {
                toast.error(data.message, toastOptions);
            }
        }
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo" />
                        <h1>snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={handelOnchange}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        onChange={handelOnchange}
                    />
                    <button type='submit'>Login</button>
                    <span>Do you have an account ? <Link to='/register'>Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

export default Login