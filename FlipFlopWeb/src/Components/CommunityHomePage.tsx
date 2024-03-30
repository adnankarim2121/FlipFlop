import { useEffect, useState } from "react";
import { UserCardDetails } from "../Interfaces/UserCardDetails";
import { useLocation } from 'react-router-dom';
import UserCard from './UserCard';
import NewCard from './NewCard';
import AddButton from './AddButton';
import Header from "./Header";
import { Typography } from "@mui/material";

function CommunityHomePage()
{
    const location = useLocation();
    const { title, description } = location.state;
    const [newCards, setNewCards] = useState<UserCardDetails[]>([])
    const [showNewCard, setShowNewCard] = useState<Boolean>(false);

    const handleAddIconClick = () => {
        setShowNewCard(true);
    };

    const handleNewCardSubmit = (details: UserCardDetails) => {
        setNewCards([...newCards, details]);
        setShowNewCard(false);
    };


      useEffect (()=>
      {
        //For later, we'll populate UserCards from our db from the selected commmunity.
      }, [])

      return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {newCards.map((userCard, index) => (
                    <div style={{marginRight:'50px'}}>
                        <UserCard 
                        key={index} 
                        userName={userCard.userName} 
                        title={userCard.title} 
                        context={userCard.context}
                        teamOne={userCard.teamOne} 
                        teamTwo={userCard.teamTwo}/>
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