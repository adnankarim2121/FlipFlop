import { useEffect, useState } from "react";
import AddButton from './AddButton';
import Header from "./Header";
import { CommunityCardDetails } from "../Interfaces/CommunityCardDetails";
import CommunityCard from "./CommunityCard";
import NewCommunityCard from "./NewCommunityCard";
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from "axios";
import SidebarUsers from "./SidebarUsers";

function HomePage()
{
    const navigate = useNavigate();
    var { urlCommunity } = useParams();

    const redirectToCommunityHomePage = (title: string | undefined, description: string | undefined, communityIndex: number) => {
        urlCommunity = title?.replace(/\s/g, "")
        navigate(`/community/${urlCommunity}`, { state: { title: title || '', description: description || '', communityIndex: communityIndex } });
    };
    
    const [newCommunities, setNewCommunities] = useState<CommunityCardDetails[]>([])
    const [showNewCommunity, setShowNewCommunity] = useState<Boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleAddIconClick = () => {
        setShowNewCommunity(true);
    };
    const handleNewCommunityCardSubmit = async (details: CommunityCardDetails) => {
        const valid = await addNewCommunity(details)
        if (valid)
        {
            setNewCommunities([...newCommunities, details]);
        }
        setShowNewCommunity(false);
    };

    const getAllCommunities = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-all-communities/');
            const allCommunities = response.data;
            setNewCommunities(allCommunities)
        } catch (error) {
            console.error('Error fetching all communities:', error);
        }
    };

    const addNewCommunity = async (details: CommunityCardDetails) =>
    {
        try {
            const response = await axios.post('http://localhost:8000/add-new-community/', {details});
            return response.data.valid
        }
        catch (error) 
        {
            console.error('Error adding community:', error);
        }
    }

    useEffect (()=>
    {
        getAllCommunities()
    }, [])

      return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {newCommunities
  .filter((communityCard:any)=>
    communityCard.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .map(communityCard => (
    <div
      style={{ marginRight: '50px' }}
      onClick={() => {
        redirectToCommunityHomePage(
          communityCard.title,
          communityCard.description,
          communityCard.index
        );
      }}
      key={communityCard.index}
    >
      <CommunityCard
        index={communityCard.index}
        title={communityCard.title}
        description={communityCard.description}
      />
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
            <div style={{ position: 'fixed', top: '20px', left: '500px', zIndex: '1000' }}>
                <input
                    type="text"
                    placeholder={isFocused ? '' : 'Search by topic'}
                    value={searchQuery}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '300px', padding: '5px', textAlign: 'center', borderRadius: 50}}
                />
             </div>
                <SidebarUsers/>
        </div>
    );
    
}

export default HomePage