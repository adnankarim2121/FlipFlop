import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { UserCardDetails } from "../Interfaces/UserCardDetails";
import UserCard from './UserCard';
import AddIcon from '@mui/icons-material/Add';
function HomePage()
{
    const [newCards, setNewCards] = useState<UserCardDetails[]>([])

    const populateCards = () => 
    {
        //loop and set random questions, usernames, etc.
        const userCardHolder: UserCardDetails[] = []
        for (var i = 0; i < 5; i++)
        {
            var userCardDetails: UserCardDetails = 
            {
                index: i,
                userName: "Adi",
                title: "Question 1"
            }
            userCardHolder.push(userCardDetails)
        }

        setNewCards([...newCards, ...userCardHolder])
    }

      useEffect (()=>
      {
        populateCards()
      }, [])

      return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <>
                {newCards.map((userCard, index) => (
                    <UserCard key={index} userName={userCard.userName} title={userCard.title}/>
                ))}
            </>
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: '1000', // Ensure it's above other content
            }}>
                <Button
                    variant="outlined"
                    style={{
                        minWidth: 0,
                        padding: '6px',
                        borderRadius: '50%',
                        fontSize: '1.5rem',
                        lineHeight: '1',
                        color: '#333',
                    }}
                >
                   <AddIcon />
                </Button>
            </div>
        </div>
    );
}

export default HomePage