import React from 'react';
import ReactDOM from 'react-dom/client'
import Main from './main';
import "@liveblocks/react-comments/styles.css";
import "./css/CommentStyle.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

