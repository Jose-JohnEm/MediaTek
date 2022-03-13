import React, { useState } from 'react'
import { Alert, Button, Grid, Input, Link, Snackbar } from '@mui/material';
import { inputSignStyle } from '../components/style'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

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

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setCPassword] = useState('')
    const [pseudo, setPseudo] = useState('')
    const nav = useNavigate()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const closeSnack = () => {
        setOpen(false)
    }

    const submitLogins = async () => {
        try {
            if (password != c_password) {
                throw 'Les mots de passes doivent être identiques'
            }

            const { data } = await axios.post(`${apiUrl}/register`, {
                email: email,
                password: password,
                pseudo: pseudo,
            });
            localStorage.setItem('token', data.token);
            nav('/validation')
        } catch (error) {
            setMessage('Un compte existe déjà avec cet email et/ou pseudo')
            setOpen(true)
        }
    }

    return (
        <div className="page-bord-centre">
        <h2 style={{margin: '2em'}}>Inscrivez-vous</h2>
        <div>
            <Grid container spacing={3}>
                <Grid style={{textAlign: 'right'}} item xs={5}>
                    <p className="micro-title">Email</p>
                </Grid>
                <Grid item xs={7} style={{textAlign: 'left'}}>
                    <Input
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value)}
                        margin='dense'
                        type='email'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </Grid>
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
                <Grid item xs={5} style={{textAlign: 'right'}}>
                    <p className="micro-title">Confirmez votre mot de passe</p>
                </Grid>
                <Grid item xs={7} style={{textAlign: 'left'}}>
                    <Input
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setCPassword(ev.target.value)}
                        margin='dense'
                        type='password'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </Grid>
                <Grid item xs={5} style={{textAlign: 'right'}}>
                    <p className="micro-title">Pseudo</p>
                </Grid>
                <Grid item xs={7} style={{textAlign: 'left'}}>
                    <Input
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPseudo(ev.target.value)}
                        margin='dense'
                        type='text'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        color="secondary"
                        variant="contained"
                        endIcon={<SendIcon />}
                        style={{backgroundColor: '#107050'}}
                        onClick={submitLogins}
                    >Suivant</Button>
                </Grid>
            </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={closeSnack}>
                  <Alert onClose={closeSnack} severity="error" sx={{ width: '100%' }}>
                    {message}
                  </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default SignupPage