"use client";
import { FormBuilder } from '@/components/common/Formbuilder';
import CustomDialog from '@/components/common/GenericModal';
import usePost from '@/hooks/usePost';
import { User } from '@/utils/types';
import { Avatar, Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from '@/utils/validations';
import closeicon from "@/assets/images/closeicon.png";
import Modal from "react-modal";
import CustomSnackbar from '@/components/Toaster';

type EditProfileModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    userData: User
};



export const EditProfileModal = ({ isOpen, handleClose, userData }: EditProfileModalProps) => {
    const [selectedImageBlob, setSelectedImageBlob] = useState<Blob | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { mutate, status, isError } = usePost({
        onPostReqSuccess: handleSuccess,
        onPostReqError(error) {
            console.log(error);
            setError((error as { response: { data: { message: string } } }).response.data.message)
          },
    });

    function handleSuccess(response: any) {
        handleClose();
    }

    const formFields = [
        {
            placeholder: "Display name",
            label: "Display name",
            type: "text",
            name: "displayName",
            defaultValue: userData.displayName,
            maxLength: 40,
            variant: "outlined",
            className: styles.textField
        },
        {
            placeholder: "Username",
            label: "Username",
            type: "alphanumeric",
            name: "username",
            defaultValue: userData.username,
            maxLength: 30,
            variant: "outlined",
            className: styles.textField
        },
        {
            placeholder: "Status",
            label: "Status",
            type: "textarea",
            name: "status",
            defaultValue: userData.status,
            maxLength: 100,
            variant: "outlined",
            className: styles.textField
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
        // Create a FormData object to handle file upload
        var formDataPayload = new FormData();
        formDataPayload.append("username", formData.username || userData.username); 
        formDataPayload.append("displayName", formData.displayName || userData.displayName); 
        formDataPayload.append("status", formData.status || userData.status); 


        console.log('Selected Image Blob', selectedImageBlob);
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
            URL.revokeObjectURL(imagePreviewUrl); 
            setImagePreviewUrl(null);
        }
    };


    const validationSchema = getValidationSchema('Profile');

    // Initialize react-hook-form with resolver
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formFields?.reduce((acc, field) => {
            acc[field.name as any] = field.defaultValue || "";
            return acc;
        }, {} as { [key: string]: any }),
    });

    const { control } = methods;

    const handleSubmit = (data: any) => {
        handleFormSubmit(data);
    };



    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={handleClose}
            className={styles.editProfileDialog}
            overlayClassName={styles.overlay}
        >
            <div className={styles.header}>
                <h2 className={styles.dialogTitle}>Edit your profile</h2>
                <button onClick={handleClose} className={styles.closeButton}>
                    <img src={closeicon.src} alt="closeicon" />
                </button>
            </div>
            {error && <CustomSnackbar message={error} severity="error" />}
            <FormProvider {...methods}>
                <form className={styles.content} onSubmit={methods.handleSubmit(handleSubmit)}>
                    <div className={styles.editProfileContainer}>
                        {/* Left section for form fields */}
                        <div className={styles.formFieldsWrapper}>
                            {!!formFields &&
                                formFields.map((field, index) => (
                                    <div key={index} className={styles.formFieldContainer}>
                                        <p className={styles.labelStyles}>{field?.label}</p>
                                        <FormBuilder formFields={field} control={control} />
                                    </div>
                                ))}
                        </div>

                        {/* Right section for profile photo */}
                        <div className={styles.profilePhotoWrapper}>
                        <p className={styles.labelProfilePhoto}>Profile Picture</p>
                            <Avatar
                                alt="Profile Photo"
                                src={imagePreviewUrl || undefined}
                                variant="rounded"
                                className={styles.profilePhoto}
                            />
                            <Button
                                className={styles.uploadProfileButtonStyles}
                                variant="outlined"
                                component="label"
                            >
                                Upload Profile Photo
                                <input type="file" hidden onChange={handleImageChange} />
                            </Button>
                            <Button
                                className={styles.removePhotoButtonStyles}
                                variant="text"
                                color="error"
                                onClick={handleRemoveImage}
                            >
                                Remove Photo
                            </Button>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className={styles.actionButtons}>
                        <Button
                            className={styles.cancelButtonStyles}
                            variant="outlined"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={styles.saveChangeButtonStyles}
                            variant="contained"
                            type="submit"
                        >
                            Save changes
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>

    );
};

export default EditProfileModal;
