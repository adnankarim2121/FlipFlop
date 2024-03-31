import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CommunityHomePage from './Components/CommunityHomePage';
import QuestionHomePage from './Components/QuestionHomePage';

function Main() {
    return (
        <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/community/:urlCommunity" element={<CommunityHomePage />} />
                <Route path="/question/:urlQuestion" element={<QuestionHomePage />} />
              </Routes>
        </Router>
    );
}

export default Main;
