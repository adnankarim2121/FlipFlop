import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../hooks/useUser';

function SignUpPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useUser();

    const redirectToHomePage = (credential?: string) => {
        if (credential!=null)
        {
            const userInfoObject = jwtDecode(credential);
            console.log(userInfoObject);
            setUserInfo(userInfoObject);    
            navigate(`/homePage`);                        
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
            <div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
                <Header />
            </div>
        </div>
    );
}

export default SignUpPage;
