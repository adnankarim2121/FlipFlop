import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { jwtDecode } from "jwt-decode";

function LoginPage() {
    const navigate = useNavigate();

    const redirectToHomePage = (credential?: string) => {
        if (credential!=null)
        {
            const userInfoObject = jwtDecode(credential);
            console.log(userInfoObject);    
            navigate(`/homePage`);                        
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px', fontFamily: 'sans-serif' }}>
                <h1>Login</h1>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <GoogleLogin
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

export default LoginPage;
