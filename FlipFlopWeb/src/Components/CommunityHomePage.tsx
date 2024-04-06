import { useEffect, useState } from "react";
import { UserCardDetails } from "../Interfaces/UserCardDetails";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserCard from './UserCard';
import NewCard from './NewCard';
import AddButton from './AddButton';
import Header from "./Header";
import { Typography } from "@mui/material";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import { UserInfoLocal } from "../Interfaces/UserInfoLocal";
import SidebarUsers from "./SidebarUsers";
import Loader from "./Loader";

function CommunityHomePage()
{
    const navigate = useNavigate();
    var { urlQuestion} = useParams();
    const [userInfo, setUserInfo] = useUser();
    const [loading, setLoading] = useState(true);
    const userInfoString = localStorage.getItem('userInfo');
    const userInfoObject: UserInfoLocal = JSON.parse(userInfoString!) as UserInfoLocal;

    const redirectToQuestionHomePage = (title: string | undefined, teamOne: string | undefined, teamTwo:string | undefined, context:string | undefined, userName:string | undefined, link:string | undefined, profilePic:string | undefined, uuid:any) => {
        const updatedUserInfo = { ...userInfoObject, questionUuid: uuid};

        // Stringify the updated userInfo object
        const updatedUserInfoString = JSON.stringify(updatedUserInfo);

        // Save the updated userInfo object back to local storage
        localStorage.setItem('userInfo', updatedUserInfoString);
        urlQuestion = title?.replace(/\s/g, "")
        navigate(`/question/${urlQuestion}`, { state: { title: title || '', 
        teamOne: teamOne || '',
        teamTwo: teamTwo || '',
        context: context || '',
        userName: userName || '',
        link:link || '',
        profilePic:profilePic || '',
        uuid} });
    };
    
    const location = useLocation();
    const {communityIndex} = location.state
    const [newCards, setNewCards] = useState<UserCardDetails[]>([])
    const [showNewCard, setShowNewCard] = useState<Boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [renderCards, setRenderCards] = useState<Boolean>(false)
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

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
        setRenderCards(!renderCards)
    };


    const getAllQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/get-all-questions/${communityIndex}`, communityIndex);
            const allQuestions = response.data;
            setNewCards(allQuestions)
        } catch (error) {
            console.error('Error fetching all questions:', error);
        }
    };

    const addNewQuestion = async (details: UserCardDetails) =>
    {
        if (userInfoObject)
        {
            details.profilePic = userInfoObject.picture
            details.userName = userInfoObject.username
        }
        try {
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
        setTimeout(() => {
            setLoading(false); // Set loading to false when the operation is complete
        }, 1500);
        getAllQuestions()
      }, [renderCards])

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {newCards
                            .filter((newCard: any) =>
                                newCard.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((userCard, index) => (
                                <div style={{ marginRight: '50px' }}
                                    onClick={() => {
                                        redirectToQuestionHomePage(
                                            userCard.title,
                                            userCard.teamOne,
                                            userCard.teamTwo,
                                            userCard.context,
                                            userCard.userName,
                                            userCard.link,
                                            userCard.profilePic,
                                            userCard.uuid
                                        );
                                    }}
                                    key={index}
                                >
                                    <UserCard
                                        key={index}
                                        profilePic={userCard.profilePic}
                                        userName={userCard.userName}
                                        title={userCard.title}
                                        context={userCard.context}
                                        teamOne={userCard.teamOne}
                                        teamTwo={userCard.teamTwo}
                                        link={userCard.link}
                                    />
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
                    <div style={{ position: 'fixed', top: '20px', marginTop: '60px', marginBottom: '60px', zIndex: '1000', justifyContent: 'center', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder={isFocused ? '' : 'Search by question'}
                            value={searchQuery}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '300px', padding: '5px', textAlign: 'center', borderRadius: 50 }}
                        />
                    </div>
                    <div style={{ position: 'fixed', top: '20px', zIndex: '1000', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="caption" component="div">
                            {description}
                        </Typography>
                    </div>
                    <SidebarUsers />
                </>
            )}
        </div>
    );
    
}

export default CommunityHomePage