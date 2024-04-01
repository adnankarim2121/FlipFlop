import { UserCardDetails } from "../Interfaces/UserCardDetails"
import { useState } from "react";
import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Grid } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import CommentParent from "./CommentParent";
import { TbFlipFlops } from "react-icons/tb";
import { TiFlowSwitch } from "react-icons/ti";

const UserCardDisplay: FC<UserCardDetails> = ({index, userName, title, teamOne, teamTwo, context, link}) =>
{
    const [selectedTeam, setSelectedTeam] = useState<number>(0);
    const [teamVote, setSelectedTeamVote] = useState<string>('');
    const [allComments, setShowAllComments] = useState<boolean>(false);

    const renderLink = (link: string | undefined) => {
        console.log("my link", link)
        if (link != undefined)
        {
            if (link.endsWith('.mp4') || link.endsWith('.webm')) {
                return <video src={link} controls />;
            } else if (link.endsWith('.png') || link.endsWith('.jpg') || link.endsWith('.jpeg')) {
                return <img src={link} alt="Image" />;
            } else if (link.includes('tiktok.com')) {
                // Assuming TikTok video URL format: https://www.tiktok.com/@username/video/1234567890
                const videoId = link.split('/').pop();
                return (
                    <iframe
                        src={`https://www.tiktok.com/embed/v2/${videoId}?lang=en`}
                        title="TikTok Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                );
            
            } else if (link.includes('youtube.com') || link.includes('youtu.be')) {
                // Assuming YouTube video URL format: https://www.youtube.com/watch?v=VIDEO_ID
                // Or: https://youtu.be/VIDEO_ID
                const videoId = link.includes('youtu.be') ? link.split('/').pop() : new URL(link).searchParams.get('v');
                return (
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                );
            } else if (link.includes('instagram.com')) {
                // Handle Instagram videos
                // Assuming the Instagram video URL is in the format https://www.instagram.com/p/VIDEO_ID/
                const videoId = link.split('/').pop();
                const embeddedUrl = `https://www.instagram.com/p/${videoId}/embed`;
                return <iframe src={embeddedUrl} />;
            } else {
                return (
                    <Typography component="a" href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </Typography>
                );
            }
        }

    };

    const handleTeamColor = (team:number) =>
    {
        setSelectedTeam(team);
    }

    const handleTeamVote = (team?:string) =>
    {
        if (team != null)
        {
            setSelectedTeamVote(team)
        }
    }

    const handleTeamPlaceHolder = () =>
    {
        if (selectedTeam == 4)
        {
            return (<></>)
        }
        else if (selectedTeam == 5)
        {
            return (<CommentParent teamPlaceHolder={teamOne} teamValue={selectedTeam} teamVote = {teamVote} allComments = {allComments}/>)
        }
        else if (selectedTeam == 6)
        {
            return (<CommentParent teamPlaceHolder="Undecided" teamValue={selectedTeam} teamVote = {teamVote} allComments = {allComments}/>)
        }
        else if (selectedTeam == 7)
        {
            return (<CommentParent teamPlaceHolder={teamTwo} teamValue={selectedTeam} teamVote = {teamVote} allComments = {allComments}/>)
        }
    }
    return(
        <div>
        <Card key={index} sx={{ minWidth: 575, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{userName != null ? 'A' : ''}</Avatar>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Hardcoded
            </Typography>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {context}
            </Typography>
            {renderLink(link)}
          </CardContent>
          <div style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => setShowAllComments(!allComments)}>
            <TiFlowSwitch />
          </div>
        </div>
        <CardActions>
          <Grid container justifyContent="space-between">
            <div>
              <Button
                size="small"
                style={{ color: selectedTeam === 5 ? 'green' : 'inherit' }}
                onClick={() => handleTeamColor(5)}
              >
                {teamOne}
              </Button>
              <TbFlipFlops onClick={() => handleTeamVote(teamOne)} />
            </div>
            <div>
              <Button
                size="small"
                style={{ color: selectedTeam === 6 ? 'green' : 'inherit' }}
                onClick={() => handleTeamColor(6)}
              >
                Undecided
              </Button>
              <TbFlipFlops onClick={() => handleTeamVote('Undecided')} />
            </div>
            <div>
              <Button
                size="small"
                style={{ color: selectedTeam === 7 ? 'green' : 'inherit' }}
                onClick={() => handleTeamColor(7)}
              >
                {teamTwo}
              </Button>
              <TbFlipFlops onClick={() => handleTeamVote(teamTwo)} />
            </div>
          </Grid>
        </CardActions>
      </Card>
      
        {handleTeamPlaceHolder()}
        </div>
    )
}

export default UserCardDisplay