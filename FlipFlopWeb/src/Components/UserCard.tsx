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

const UserCard: FC<UserCardDetails> = ({index, userName, title, teamOne, teamTwo, context, link}) =>
{
    const [selectedTeam, setSelectedTeam] = useState<number>(0);

    const handleTeamColor = (team:number) =>
    {
        setSelectedTeam(team);
    }

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
    

    return(
        <Card key={index} sx={{ minWidth: 275 }}>
        <CardContent>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{userName != null? 'A' : ''}</Avatar>
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
        <CardActions>
        <Grid container justifyContent="space-between">
            <Button size="small"
                style={{ color: selectedTeam === 1 ? 'green' : 'inherit' }}
                onClick={() => handleTeamColor(1)}
            >
                {teamOne}
            </Button>
            <Button size="small"
                style={{ color: selectedTeam === 2 ? 'green' : 'inherit' }}
                onClick={() => handleTeamColor(2)}
            >
                {teamTwo}
            </Button>
        </Grid>
    </CardActions>
    </Card>
    )
}

export default UserCard