import React, { useState } from 'react'
import { Alert, AlertColor, Button, Input, Snackbar } from '@mui/material';
import { inputSignStyle } from '../components/style'
import axios  from 'axios';
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

const ValidationPage : React.FC =  () => {
    const [code, setCode] = useState('')
    const nav = useNavigate()
    const storedJwt : string = localStorage.getItem('token')!
    const [jwt, setJwt] = useState(storedJwt || '')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [category, setCategory] = useState('info')

    const closeSnack = () => {
        setOpen(false)
    }

    const isTokenValid = async () => {
        const { status, data } = await axios.get(`${apiUrl}/auth/user`);
        if (status === 201 && data._id === undefined) {
            if (data.message === "Invalid Token") {
                nav('/singin')
            }
        }
        else {
            setCategory('error')
            setMessage("Le token est expiré !")
            setOpen(true)
        }
    }

    const isCodeValid = async () => {
        try {
            const { status } = await axios.post(`${apiUrl}/auth/validation`, {
                code: parseInt(code),
            });
            if (status === 200) {
                nav('/news')
                return
            }
        } catch (error) {
            setCategory('error')
            setMessage(`Code ${error as string}`)
            setOpen(true)
        }
    }

    const reSendCode = async () => {
        try {
            await axios.get(`${apiUrl}/auth/validation`);

            setMessage(`Un nouveau code a été envoyé !`)
            setCategory('info')
            setOpen(true)
        } catch (error) {
            setCategory('error')
            setMessage(`Une erreur s'est produite durant l'envoi du code`)
            setOpen(true)
        }
    }

    isTokenValid()

    return (
        <div className="page-bord-centre">
            <h2 style={{marginTop: '2em'}}>Confirmez votre code secret</h2>
            <h3 style={{margin: '2em'}}>Un code vous a été envoyé par email !</h3>
            <div style={{textAlign: 'center'}}>
                <div className="sign-field">
                    <p className="micro-title">Code Secret</p>
                    <Input
                        type="password"
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setCode(ev.target.value)}
                        margin='dense'
                        disableUnderline={true}
                        sx={inputSignStyle}
                    ></Input>
                </div>
                <div>
                    <Button
                        onClick={ev => reSendCode()}
                        sx={{
                            color: '#005050',
                            fontSize: '1.2em',
                            borderStyle: 'none',
                            margin: '1em'
                        }}
                    >Besoin d'un nouveau lien ?</Button>
                </div>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={isCodeValid}
                    endIcon={<SendIcon />}
                    style={{backgroundColor: '#107050'}}
                >Suivant</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={closeSnack}>
                  <Alert onClose={closeSnack} severity={category as AlertColor} sx={{ width: '100%' }}>
                    {message}
                  </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default ValidationPage