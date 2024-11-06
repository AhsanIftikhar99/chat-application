"use client"
import React from 'react'
import CustomDialog from '@/components/common/GenericModal'

export const ProfileModal = () => {
    const [isOpen, setIsOpen] = React.useState(true)

    const handleClose = () => setIsOpen(false)

    const handleFormSubmit = (formData: { [key: string]: any }) => {
    }

    return (
        <CustomDialog
            title="Profile"
            open={isOpen}
            onClose={handleClose}
            // formFields={formFields}
            onSubmit={handleFormSubmit}
            positionRight={true} // Pass this to apply the right-aligned position
        />

    )
}
