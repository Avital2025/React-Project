import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormEvent, useContext, useRef, useState } from 'react';
import axios, { AxiosError } from "axios";
import { IsLogin, User } from '../App';
import { style } from '../styleModel';
import UpdateDetails from './UpdateDetails';
import Swal from 'sweetalert2';
export default function Login() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [click, setClick] = useState("");
    const [open, setOpen] = useState(false);
    const userContext = useContext(User);
    const [isLogin, setLogin] = useContext(IsLogin);

    const handleClose = () => setOpen(false);
    const handleOpenSignIn = () => { setClick("SIGN IN"); setOpen(true); };
    const handleOpenSignUp = () => { setClick("SIGN UP"); setOpen(true); };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = "http://localhost:3000";
        try {
            const res = await axios.post(`${url}/api/user/${click === 'SIGN UP' ? 'register' : 'login'}`, {
                email: email.current?.value,
                password: password.current?.value
            });
            userContext.userDispatch({
                type: 'LOGIN',
                data: click === 'SIGN UP' ? {
                    id: res.data.userId,
                    email: email.current?.value,
                    password: password.current?.value
                } : { ...res.data.user }
            });
            setLogin(true);
            handleClose();
        } catch (e: AxiosError | any) {
            if (e.response?.status === 404||e.response?.status === 401) {
                handleClose();
                Swal.fire("Oops...", "User not found! Please sign up first.", "error");            
            }
            else if (e.response?.status === 422)
                alert(e.response.data.message);
            else if (e.response?.status === 400) {
                handleClose();
                Swal.fire("Oops...", "This user already exists. Please sign in.", "error");            
            }
            else throw new Error(e.response.status + " " + e.response.data.message);
        }
    };

    return (
        <>
            <Box sx={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 1 }}>
                {!isLogin ? (
                    <>
                        <Button onClick={handleOpenSignIn} color='inherit'>SIGN IN</Button>
                        <Button onClick={handleOpenSignUp} color='inherit'>SIGN UP</Button>
                    </>
                ) : <UpdateDetails />}
            </Box>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter your email and code
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <TextField inputRef={email} label="email" variant="outlined" type='email' />
                            <TextField inputRef={password} label="password" variant="outlined" type='password' />
                            <Button type="submit">save</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
