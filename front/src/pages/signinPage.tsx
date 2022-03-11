import React, { useState } from 'react'
import { Alert, Button, Input, Link, Snackbar } from '@mui/material';
import { inputSignStyle } from '../components/style'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:8080'

axios.interceptors.request.use(
    config => {
      const { origin } = new URL(config.url as string);
      const allowedOrigins = [apiUrl];
      const token = localStorage.getItem('token');    if (allowedOrigins.includes(origin)) {
        config.headers!.authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

const SigninPage : React.FC =  () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const nav = useNavigate()

    const closeSnack = () => {
        setOpen(false)
    }

    async function tryLogin () {
        try {
            const { data } = await axios.post(`${apiUrl}/login`, {
                email: email,
                password: password,
            });
            localStorage.setItem('token', data.token);
            nav('/news')
        } catch (err) {
            setMessage(err as string)
            setOpen(true)
        }
    }

    return (
        <div className="page-bord-centre">
            <h2>Connectez-vous</h2>
            <div style={{textAlign: 'center'}}>
                <div className="sign-field">
                    <p className="micro-title">Email</p>
                    <Input
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value)}
                        margin='dense'
                        type='email'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </div>
                <div className="sign-field">
                    <p className="micro-title">Mot de passe</p>
                    <Input
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)}
                        margin='dense'
                        type='password'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </div>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={tryLogin}
                    sx={{
                        padding: '0.5em',
                        fontFamily: 'Quicksand',
                        fontSize: '1.5em',
                        borderRadius: '1em',
                        borderStyle: 'solid'
                    }}
                >Suivant</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={closeSnack}>
                  <Alert onClose={closeSnack} severity="error" sx={{ width: '100%' }}>
                    {message}
                  </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default SigninPage