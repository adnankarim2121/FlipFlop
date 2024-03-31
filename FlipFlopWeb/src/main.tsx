import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CommunityHomePage from './Components/CommunityHomePage';
import QuestionHomePage from './Components/QuestionHomePage';
import CommentParent from './Components/CommentParent';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/communityHomePage" element={<CommunityHomePage />} />
                <Route path="/questionHomePage" element={<QuestionHomePage />} />
                <Route path="/commentDiscussion" element={<CommentParent />} />
            </Routes>
        </Router>
    );
}

export default Main;
