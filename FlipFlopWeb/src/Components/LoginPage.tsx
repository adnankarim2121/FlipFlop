import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useUser } from '../hooks/useUser';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserInfo } from '../hooks/useUser';

function LoginPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useUser();

    const redirectToHomePage = async (credential?: string) => {
        if (credential!=null)
        {
            const userInfoObject = jwtDecode(credential);
            const loginResponse = await checkLoginExists(userInfoObject);
            const loginExists = loginResponse.valid
            if (loginExists)
            {
                localStorage.setItem('userInfo', JSON.stringify(userInfoObject));
                setUserInfo(userInfoObject)
                setUserInfo((prevUserInfo: UserInfo) => ({
                    ...prevUserInfo,
                    username: loginResponse.username
                  }));  
                navigate(`/homePage`);   
            }
            else
            {
                toast("Account not found. Sign up instead!");
            }
                     
        }
    };

    const checkLoginExists = async (userInfoObject: JwtPayload) => {
        try {
            const response = await axios.post('http://localhost:8000/check-login/',  userInfoObject );
            return response.data
        } catch (error) {
            console.error('Error checking login:', error);
        }
    };
    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px', fontFamily: 'sans-serif' }}>
                <h1>Sign in</h1>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <GoogleLogin
                    useOneTap = {true}
                    onSuccess={credentialResponse => {
                        const token = credentialResponse.credential;                 
                        redirectToHomePage(token);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
            <div style={{ marginTop: '20px', fontFamily: 'sans-serif' }}>
                <Link to="/signUp">Sign Up</Link>
            </div>
            <div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
                <Header />
            </div>
        </div>
    );
}

export default LoginPage;
