import React from 'react';
import ReactDOM from 'react-dom/client'
import Main from './main';
import "@liveblocks/react-comments/styles.css";
import "./css/CommentStyle.css"
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="529127854089-hp85mer42u4gm275c24li1h425eojus1.apps.googleusercontent.com">
    <React.StrictMode>
        <Main />
    </React.StrictMode>
    </GoogleOAuthProvider>

);

