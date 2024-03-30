import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { CommunityCardDetails } from '../Interfaces/CommunityCardDetails';

interface NewCommunityCardProps {
    onSubmit: (details: CommunityCardDetails) => void;
}

const NewCommunityCard: React.FC<NewCommunityCardProps> = ({ onSubmit }) => {
    const [newCommunityCardDetails, setNewCommunityCardDetails] = useState<CommunityCardDetails>({ title: '', description: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCommunityCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(newCommunityCardDetails);
        setNewCommunityCardDetails({ title: '', description:'' });
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
                    value={newCommunityCardDetails.title}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Description"
                    name="description"
                    value={newCommunityCardDetails.description}
                    multiline
                    rows={4} // Set the number of rows
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

export default NewCommunityCard;
