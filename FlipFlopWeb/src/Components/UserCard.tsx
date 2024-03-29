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

const UserCard: FC<UserCardDetails> = ({index, userName, title, teamOne, teamTwo, context}) =>
{
    const [selectedTeam, setSelectedTeam] = useState<number>(0);

    const handleTeamColor = (team:number) =>
    {
        setSelectedTeam(team);
    }
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