import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CommunityHomePage from './Components/CommunityHomePage';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/communityHomePage" element={<CommunityHomePage />} />
            </Routes>
        </Router>
    );
}

export default Main;
