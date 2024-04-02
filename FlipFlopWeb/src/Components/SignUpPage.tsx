import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useUser } from '../hooks/useUser';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignUpPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useUser();

    const redirectToHomePage = async (credential?: string) => {
        if (credential!=null)
        {
            const userInfoObject = jwtDecode(credential);
            console.log(userInfoObject)
            const emailExists = await checkEmailExists(userInfoObject);
            if (!emailExists)
            {
                setUserInfo(userInfoObject);    
                navigate(`/createUserName`);   
            }
            else
            {
                toast("Email already exists. Sign in instead!");
            }
                     
        }
    };

    const checkEmailExists = async (userInfoObject: JwtPayload) => {
        try {
            const response = await axios.post('http://localhost:8000/check-email/',  userInfoObject );
            return response.data.exists
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px', fontFamily: 'sans-serif' }}>
                <h1>Create an Account</h1>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <GoogleLogin
                    useOneTap = {true}
                    context = 'signup'
                    text = 'continue_with'
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
                <Link to="/">Sign in</Link>
            </div>
            <div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
                <Header />
            </div>
        </div>
    );
}

export default SignUpPage;