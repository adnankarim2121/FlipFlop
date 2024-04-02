import { useEffect, useState } from "react";
import { UserCardDetails } from "../Interfaces/UserCardDetails";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserCard from './UserCard';
import NewCard from './NewCard';
import AddButton from './AddButton';
import Header from "./Header";
import { Typography } from "@mui/material";
import axios from "axios";

function CommunityHomePage()
{
    const navigate = useNavigate();
    var { urlQuestion} = useParams();

    const redirectToQuestionHomePage = (title: string | undefined, teamOne: string | undefined, teamTwo:string | undefined, context:string | undefined, userName:string | undefined, link:string | undefined) => {
        urlQuestion = title?.replace(/\s/g, "")
        navigate(`/question/${urlQuestion}`, { state: { title: title || '', 
        teamOne: teamOne || '',
        teamTwo: teamTwo || '',
        context: context || '',
        userName: userName || '',
        link:link || '' } });
    };
    
    const location = useLocation();
    const { title, description, communityIndex } = location.state;
    const [newCards, setNewCards] = useState<UserCardDetails[]>([])
    const [showNewCard, setShowNewCard] = useState<Boolean>(false);

    const handleAddIconClick = () => {
        setShowNewCard(true);
    };

    const handleNewCardSubmit = async (details: UserCardDetails) => {
        const valid = await addNewQuestion(details)
        if (valid)
        {
            setNewCards([...newCards, details]);
        }
        setShowNewCard(false);
    };


    const getAllQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/get-all-questions/${communityIndex}`, communityIndex);
            const allQuestions = response.data;
            console.log("all questions", allQuestions)
            console.log(allQuestions)
            setNewCards(allQuestions)
        } catch (error) {
            console.error('Error fetching all questions:', error);
        }
    };

    const addNewQuestion = async (details: UserCardDetails) =>
    {
        try {
            console.log("my com index", communityIndex)
            const response = await axios.post('http://localhost:8000/add-new-question/', {details, communityIndex});
            return response.data.valid
        }
        catch (error) 
        {
            console.error('Error adding community:', error);
        }
    }
      useEffect (()=>
      {
        getAllQuestions()
      }, [])

      return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {newCards.map((userCard, index) => (
                        <div style={{marginRight:'50px'}} 
                        onClick={() => {
                            redirectToQuestionHomePage(userCard.title, userCard.teamOne, userCard.teamTwo, userCard.context, userCard.userName, userCard.link);
                        }}>
                        <UserCard 
                        key={index} 
                        userName={userCard.userName} 
                        title={userCard.title} 
                        context={userCard.context}
                        teamOne={userCard.teamOne} 
                        teamTwo={userCard.teamTwo}
                        link={userCard.link}/>
                    </div>
                    ))}
            </div>
            {showNewCard && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
                    <NewCard onSubmit={handleNewCardSubmit} />
                </div>
            )}
            <div style={{ position: 'fixed', bottom: '20px', right: '50%', zIndex: '1000' }}>
                <AddButton onClick={handleAddIconClick} />
            </div>
            <div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
                <Header/>
            </div>

            <div style={{ position: 'fixed', top: '20px', zIndex: '1000', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="caption" component="div">
                        {description}
                    </Typography>
            </div>

        </div>
    );
}

export default CommunityHomePage