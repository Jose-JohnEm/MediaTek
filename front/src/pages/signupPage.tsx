import React, { useState } from 'react'
import { Button, Input, Link } from '@mui/material';
import { inputSignStyle } from '../components/style'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setCPassword] = useState('')
    const [pseudo, setPseudo] = useState('')

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
                    href='/validation'
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