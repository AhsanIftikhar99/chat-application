"use client";
import { FormBuilder } from '@/components/common/Formbuilder';
import CustomDialog from '@/components/common/GenericModal';
import usePost from '@/hooks/usePost';
import { User } from '@/utils/types';
import { Avatar, Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

type EditProfileModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    userData: User
};



export const EditProfileModal = ({ isOpen, handleClose, userData }: EditProfileModalProps) => {
    const [selectedImageBlob, setSelectedImageBlob] = useState<Blob | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    console.log('user data', userData);
    const { mutate, status, isError } = usePost({
        onPostReqSuccess: handleSuccess,
    });

    function handleSuccess(response: any) {
        console.log(response);
        handleClose();
    }

    const formFields = [
        {
            placeholder: "Display name",
            label: "Display name",
            type: "text",
            name: "displayName",
            defaultValue: userData.displayName,
            value: userData.displayName,
            maxLength: 40,
            minLength: 4,
            variant: "outlined",
            className: styles.textField
        },
        {
            placeholder: "Username",
            label: "Username",
            type: "alphanumeric",
            name: "username",
            defaultValue: userData.username,
            minLength: 6,
            maxLength: 30,
            variant: "outlined"
        },
        {
            placeholder: "Status",
            label: "Status",
            type: "textarea",
            name: "status",
            defaultValue: userData.status,
            minLength: 6,
            maxLength: 100,
            variant: "outlined"
        },
    ];

    useEffect(() => {
        if (userData?.profilePicture && typeof userData.profilePicture !== 'string') {
            // Convert Buffer data to a Base64 string
            const base64String = Buffer.from(userData.profilePicture.data).toString('base64');
            setImagePreviewUrl(`data:image/png;base64,${base64String}`);
        }
    }, [userData?.profilePicture]);

    const handleFormSubmit = (formData: { [key: string]: any }) => {
        console.log('Form data', formData);

        // Create a FormData object to handle file upload
        const formDataPayload = new FormData();
        formDataPayload.append("username", formData.username || userData.username); // Fallback to userData value if empty
        formDataPayload.append("displayName", formData.displayName || userData.displayName); // Fallback to userData value if empty
        formDataPayload.append("status", formData.status || userData.status); // Fallback to userData value if empty

        if (selectedImageBlob) {
            formDataPayload.append("profilePicture", selectedImageBlob);
        }

        console.log('Form data payload', formDataPayload);
        mutate({
            API_URL: "/api/users/updateUserDetails",
            BODY: formDataPayload,
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImageBlob(file); // Store the Blob

            // Create a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setImagePreviewUrl(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImageBlob(null);
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl); // Clean up the Blob URL
            setImagePreviewUrl(null);
        }
    };

    return (
        <CustomDialog
            title="Edit your profile"
            open={isOpen}
            onClose={handleClose}
            onSubmit={handleFormSubmit}
        >
            <div className={styles.editProfileContainer}>
                <div className={styles.formFieldsWrapper}>
                    {!!formFields && formFields.map((field, index) => (
                        <div key={index} className={styles.formFieldContainer}>
                            <FormBuilder formFields={field} />
                        </div>
                    ))}
                </div>
                <div className={styles.profilePhotoWrapper}>
                    <Avatar
                        alt="Profile Photo"
                        src={imagePreviewUrl || undefined} // Display preview URL or default
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
                </div>
            </div>
            <Divider />
            <div className={styles.actionButtons}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} variant="contained" color="primary" type="submit">
                    Save changes
                </Button>
            </div>
        </CustomDialog>
    );
};

export default EditProfileModal;
