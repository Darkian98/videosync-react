import { Typography } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { GridCheckCircleIcon } from '@mui/x-data-grid';

interface IEditableDiv {
    initialText: number, onTextChange: any
}

const EditableDiv = ({ initialText, onTextChange }: IEditableDiv) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);

    const handleTextChange = (e: any) => {
        setText(e.target.value);
        if (onTextChange) {
            onTextChange(e.target.value);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="number"
                        value={text}
                        onChange={handleTextChange}
                        onBlur={handleBlur}
                        className='border border-gray-300 rounded-md px-1 py-0.5'
                        autoFocus
                    />
                    <GridCheckCircleIcon className='text-green-600 scale-100 hover:scale-110 transition-all cursor-pointer' />
                </>
            ) : (

                <div className='cursor-pointer' onClick={() => setIsEditing(true)}>
                    <Typography variant='h3'>
                        {Number(text).toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}€
                        <EditIcon className='text-orange-300' />
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default EditableDiv;