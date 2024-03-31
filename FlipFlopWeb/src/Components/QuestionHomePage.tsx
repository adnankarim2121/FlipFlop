import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "./Header";
import UserCardDisplay from "./UserCardDisplay";

function QuestionHomePage()
{
    const location = useLocation();
    const { title, teamOne, teamTwo, context, userName, link } = location.state;

    const navigate = useNavigate();

    const redirectToComments = (title: string | undefined, description: string | undefined) => {
        navigate('/commentDiscussion', { state: { title: title || '', description: description || '' } });
    };

      useEffect (()=>
      {
        //For later, we'll populate existing question with previous user data
      }, [])

      return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{marginRight:'50px'}}
                    onClick={() => {
                        redirectToComments('', '');
                    }}>
                        <UserCardDisplay 
                        key={0} 
                        userName={userName} 
                        title={title} 
                        context={context}
                        teamOne={teamOne} 
                        teamTwo={teamTwo}
                        link={link}
                        />
                    </div>

            </div>
            <div style={{ position: 'fixed', top: '20px', left: '0%', zIndex: '1000' }}>
                <Header/>
            </div>
        </div>
    );
}

export default QuestionHomePage