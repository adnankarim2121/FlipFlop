import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { UserCardDetails } from '../Interfaces/UserCardDetails';

interface NewCardProps {
    onSubmit: (details: UserCardDetails) => void;
}

const NewCard: React.FC<NewCardProps> = ({ onSubmit }) => {
    const [newCardDetails, setNewCardDetails] = useState<UserCardDetails>({ userName: '', title: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(newCardDetails);
        setNewCardDetails({ userName: '', title: '', teamOne: '', teamTwo: '', context:'', link:'' });
    };

    return (
        <div style={{
            
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            padding: '20px',
        }}>
<Card style={{ width: '500px' }}>
    <CardContent>
        <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
                <TextField
                    label="Title"
                    name="title"
                    value={newCardDetails.title}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Context"
                    name="context"
                    value={newCardDetails.context}
                    multiline
                    rows={4} // Set the number of rows
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Link"
                    name="link"
                    value={newCardDetails.link}
                    multiline
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Team One"
                    name="teamOne"
                    value={newCardDetails.teamOne}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Team Two"
                    name="teamTwo"
                    value={newCardDetails.teamTwo}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <Button variant="outlined" onClick={handleSubmit}>
                    Submit
                </Button>
            </Grid>
        </Grid>
    </CardContent>
</Card>


        </div>
    );
};

export default NewCard;
