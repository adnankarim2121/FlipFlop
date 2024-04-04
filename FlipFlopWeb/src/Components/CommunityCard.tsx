import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { CommunityCardDetails } from "../Interfaces/CommunityCardDetails";

const CommunityCard: FC<CommunityCardDetails> = ({index, title, description}) =>
{
    return(
        <Card key={index} sx={{ minWidth: 275 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {description}
            </Typography>
        </CardContent>
    </Card>
    )
}

export default CommunityCard