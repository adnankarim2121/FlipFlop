import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface AddButtonProps {
    onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
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
            onClick={onClick}
        >
            <AddIcon />
        </Button>
    );
};

export default AddButton;
