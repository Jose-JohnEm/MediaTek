import React, { useState } from 'react'
import { Button, Input, Link } from '@mui/material';
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

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setCPassword] = useState('')
    const [pseudo, setPseudo] = useState('')
    const nav = useNavigate()

    const submitLogins = async () => {
        const { data } = await axios.post(`${apiUrl}/register`, {
            email: email,
            password: password,
            pseudo: pseudo,
        });
        console.log(data)
        if (password !== c_password) {
            return
        }
        nav('/validation')
    }

    return (
        <div className="page-bord-centre">
            <h2>Inscrivez-vous</h2>
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
                <div className="sign-field">
                    <p className="micro-title">Confirmez le mot de passe</p>
                    <Input
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setCPassword(ev.target.value)}
                        margin='dense'
                        type='password'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </div>
                <div className="sign-field">
                    <p className="micro-title">Pseudo</p>
                    <Input
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPseudo(ev.target.value)}
                        margin='dense'
                        type='text'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </div>
                <Button
                    color="secondary"
                    variant="outlined"
                    href='#'
                    onClick={(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {submitLogins()}}
                    sx={{
                        padding: '0.5em',
                        fontFamily: 'Quicksand',
                        fontSize: '1.5em',
                        borderRadius: '1em',
                        borderStyle: 'solid'
                    }}
                >Suivant</Button>
            </div>
        </div>
    )
}

export default SignupPage