import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from "./Header";
import UserCardDisplay from "./UserCardDisplay";
import SidebarUsers from "./SidebarUsers";
import Loader from "./Loader";

function QuestionHomePage()
{
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const { title, teamOne, teamTwo, context, userName, link, profilePic, uuid } = location.state;

      useEffect (()=>
      {
        //For later, we'll populate existing question with previous user data
        setTimeout(() => {
          setLoading(false); // Set loading to false when the operation is complete
      }, 1500);
      }, [])

      return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ marginRight: '50px' }}>
                            <UserCardDisplay
                                key={0}
                                userName={userName}
                                profilePic={profilePic}
                                title={title}
                                context={context}
                                teamOne={teamOne}
                                teamTwo={teamTwo}
                                link={link}
                                uuid={uuid}
                            />
                        </div>
                    </div>
                    <SidebarUsers />
                </>
            )}
        </div>
    );
    
}

export default QuestionHomePage