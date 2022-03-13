import React, { useState } from 'react'
import { Alert, Button, Card, Grid, Input, Snackbar, TextField } from '@mui/material';
import { inputSignStyle } from '../components/style'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { GoogleLog } from '../components/google';

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
            })
            localStorage.setItem('token', data.token);
            nav('/news')
        }
        catch(err :any) {
            setMessage("Les informations sont incorrects")
            setOpen(true)
        }
    }

    return (
        <div className="page-bord-centre">
            <h2 style={{margin: '2em'}}>Connectez-vous</h2>
            <div>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <GoogleLog openSetter={setOpen} messageSetter={setMessage} />
                    </Grid>
                    <Grid style={{textAlign: 'right'}} item xs={5}>
                        <p className="micro-title">Email</p>
                    </Grid>
                    <Grid item xs={5} style={{textAlign: 'left'}}>
                        <Input
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value)}
                            margin='dense'
                            type='email'
                            disableUnderline={true}
                            autoFocus
                            sx={inputSignStyle}
                        ></Input>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left'}}></Grid>
                    <Grid item xs={5} style={{textAlign: 'right'}}>
                        <p className="micro-title">Mot de passe</p>
                    </Grid>
                    <Grid item xs={7} style={{textAlign: 'left'}}>
                        <Input
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)}
                            margin='dense'
                            type='password'
                            disableUnderline={true}
                            sx={inputSignStyle}
                        ></Input>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={tryLogin}
                            endIcon={<SendIcon />}
                            style={{backgroundColor: '#107050'}}
                        >Suivant</Button>
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={2000} onClose={closeSnack}>
                  <Alert onClose={closeSnack} severity="error" sx={{ width: '100%' }}>
                    {message}
                  </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default SigninPage