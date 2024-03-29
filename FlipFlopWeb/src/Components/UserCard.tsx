import { UserCardDetails } from "../Interfaces/UserCardDetails"
import { useState } from "react";
import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

const UserCard: FC<UserCardDetails> = ({index, userName, title}) =>
{
    const [selectedTeam, setSelectedTeam] = useState<number>(0);

    const handleTeamColor = (team:number) =>
    {
        setSelectedTeam(team);
    }
    return(
        <Card key={index} sx={{ minWidth: 275 }}>
        <CardContent>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{userName != null? userName[0] : ''}</Avatar>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {userName}
            </Typography>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small"
                style={{ color: selectedTeam === 1 ? 'green' : 'inherit' }}
                onClick={() => handleTeamColor(1)}
            >
                Team 1
            </Button>
            <Button size="small"
                style={{ color: selectedTeam === 2 ? 'green' : 'inherit' }}
                onClick={() => handleTeamColor(2)}
            >
                Team 2
            </Button>
        </CardActions>
    </Card>
    )
}

export default UserCard