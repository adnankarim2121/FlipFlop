import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { CiCircleCheck } from "react-icons/ci";
import Header from './Header';
import { UserInfo } from '../hooks/useUser';


const CreateUserName: React.FC = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async () => {
        if (username.trim() === '') {
            toast('Username cannot be empty.')
        } 
        else if (username.trim().length < 5) 
        {
            toast('Username must be at least 5 characters long.')
        } 
        else if (/\s/.test(username)) 
        {
            toast('Username cannot contain spaces.')
        }
        else 
        {
            var updatedUserName = 'f/' + username
            const userNameExists = await checkUsernameExists(updatedUserName)
            if (!userNameExists)
            {
                toast(`Welcome to FlipFlop ${username}`)
                setUserInfo((prevUserInfo: UserInfo) => ({
                    ...prevUserInfo,
                    username: updatedUserName
                  }));
                navigate(`/homePage`)
            }
            else
            {
                toast(`${updatedUserName} already exists.`)
            }
            setError('');
        }
    };

    const checkUsernameExists = async (username: string) => {
        try {
            var email = ''
            if (userInfo!= null)
            {
                email = userInfo.email
            }
            const response = await axios.post('http://localhost:8000/check-username-exists/', { username, email });
            return response.data.exists;
        } catch (error) {
            console.error('Error checking username:', error);
            return false; // Return false in case of an error
        }
    };

    return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
            label="Username"
            value={username}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            placeholder='f/'
            style={{ marginRight: '20px' }}
        />
    <CiCircleCheck onClick={handleSubmit}/>

    <div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
                <Header />
            </div>
    </div>
</div>


    );
};

export default CreateUserName;
