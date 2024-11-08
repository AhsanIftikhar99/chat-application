"use client";
import React, { useState } from 'react';
import CustomDialog from '@/components/common/GenericModal';
import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material';
import styles from './index.module.scss';
import { FormBuilder } from '@/components/common/Formbuilder';
import usePost from '@/hooks/usePost';
import Loader from '@/components/Loader';

type EditProfileModalProps = {
    isOpen: boolean;
    handleClose: () => void;
};

const formFields = [
    {
        placeholder: "Display name",
        label: "Display name",
        type: "text",
        name: "displayName",
        maxLength: 40,
        variant: "outlined"
    },
    {
        placeholder: "Username",
        label: "Username",
        type: "text",
        name: "username",
        minLength: 6,
        maxLength: 30,
        variant: "outlined"
    },
    {
        placeholder: "Status",
        label: "Status",
        type: "textarea",
        name: "status",
        minLength: 6,
        maxLength: 100,
        variant: "outlined"
    },
];

export const EditProfileModal = ({ isOpen, handleClose }: EditProfileModalProps) => {
    const [selectedImage, setSelectedImage] = useState<string | ''>('');

    const { mutate, status, isError } = usePost<any>({
        onPostReqSuccess: handleSuccess,
    });

    function handleSuccess(response:any) {
        console.log(response);
    }

    const handleFormSubmit = (formData: { [key: string]: any }) => {
        console.log('Form data', formData);
        const payload={
            username:formData.username,
            displayName:formData.displayName,
            status:formData.status,
            profilePicture:selectedImage.length > 0 ? selectedImage : null
        }
        mutate({
            API_URL: "/api/users/updateUserDetails",
            BODY: payload,
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage('');
    };

    return (
        <CustomDialog
            title="Edit your profile"
            open={isOpen}
            onClose={handleClose}
            onSubmit={handleFormSubmit}
            sx={{
                maxWidth: '600px',
                margin: 'auto',
            }}
        >
            {status==="pending" && <Loader />}
            <Box className={styles.editProfileContainer}>
                <Box className={styles.formFieldsWrapper}>
                    {!!formFields && formFields.map((field, index) => (
                        <Box key={index} className={styles.formFieldContainer}>
                            <FormBuilder formFields={field} />
                        </Box>
                    ))}
                </Box>
                <Box className={styles.profilePhotoWrapper}>
                    <Avatar
                        alt="Profile Photo"
                        src={selectedImage} // Display uploaded image or default
                        className={styles.profilePhoto}
                    />
                    <Button
                        sx={{ fontSize: '12px', width: '100%', textTransform: 'none', mt: '5px' }}
                        variant="outlined"
                        component="label"
                    >
                        Upload Profile Photo
                        <input type="file" hidden onChange={handleImageChange} />
                    </Button>
                    <Button
                        sx={{ fontSize: '12px', textTransform: 'none' }}
                        variant="text"
                        color="error"
                        onClick={handleRemoveImage}
                    >
                        Remove Photo
                    </Button>
                </Box>
            </Box>
            <Divider />
            <Box className={styles.actionButtons}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} variant="contained" color="primary" type="submit">
                    Save changes
                </Button>
            </Box>
        </CustomDialog>
    );
};

export default EditProfileModal;
