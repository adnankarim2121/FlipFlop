import { useEffect, useState } from "react";
import { UserCardDetails } from "../Interfaces/UserCardDetails";
import UserCard from './UserCard';
import NewCard from './NewCard';
import AddButton from './AddButton';
import Header from "./Header";

function HomePage()
{
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
            <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: '1000' }}>
                <Header/>
            </div>
        </div>
    );
}

export default HomePage