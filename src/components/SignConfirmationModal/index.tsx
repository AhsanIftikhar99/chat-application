import closeicon from "@/assets/images/closeicon.png";
import gmailIcon from '@/assets/images/gmail.png';
import msgIcon from '@/assets/images/msgIcon.png';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the Box horizontally and vertically
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

interface SignupConfirmationModalProps {
    open: boolean;
    handleClose: () => void;
    email: string;
}

const SignupConfirmationModal: React.FC<SignupConfirmationModalProps> = ({ open, handleClose, email }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <img src={closeicon.src} alt="closeicon" height={'20px'} width={'20px'} />
                </IconButton>
                <img src={msgIcon.src} alt='Message Icon' width={'75px'} height={'80px'} />
                <Typography variant="h6" sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', color: '#06334D', lineHeight: '30px', fontSize: '17px' }}>
                    Thanks! We have sent a confirmation email to {email}
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<img src={gmailIcon.src} alt="Gmail Icon" width={20} />}
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener"
                    fullWidth
                >
                    Open Gmail
                </Button>
            </Box>
        </Modal>
    );
};

export default SignupConfirmationModal;
