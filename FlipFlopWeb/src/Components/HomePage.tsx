import { useEffect, useState } from "react";
import AddButton from './AddButton';
import Header from "./Header";
import { CommunityCardDetails } from "../Interfaces/CommunityCardDetails";
import CommunityCard from "./CommunityCard";
import NewCommunityCard from "./NewCommunityCard";
import { useNavigate } from 'react-router-dom'; 

function HomePage()
{
    const navigate = useNavigate();

    const redirectToCommunityHomePage = (title: string, description: string) => {
        navigate('/communityHomePage', { state: { title: title || '', description: description || '' } });
    };
    
    const [newCommunities, setNewCommunities] = useState<CommunityCardDetails[]>(
        [{index:0, title:'NBA', description:'Lebron or MJ?'},
        {index:1, title:'🇵🇸 vs 🇮🇱', description:'Who is actually the enemy?'},
        {index:2, title:'AITAH', description:'The title says it.'}])
    const [showNewCommunity, setShowNewCommunity] = useState<Boolean>(false);

    const handleAddIconClick = () => {
        setShowNewCommunity(true);
    };
    const handleNewCommunityCardSubmit = (details: CommunityCardDetails) => {
        setNewCommunities([...newCommunities, details]);
        setShowNewCommunity(false);
    };

      useEffect (()=>
      {
      }, [])

      return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {newCommunities.map((communityCard) => (
                        <div style={{marginRight:'50px'}} 
                        onClick={() => {
                            if (communityCard.title && communityCard.description) {
                                redirectToCommunityHomePage(communityCard.title, communityCard.description);
                            }
                        }}>
                            <CommunityCard 
                            key={communityCard.index} 
                            title={communityCard.title} 
                            description={communityCard.description}/>
                        </div>
                        ))}
            </div>
            {showNewCommunity && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
                    <NewCommunityCard onSubmit={handleNewCommunityCardSubmit} />
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