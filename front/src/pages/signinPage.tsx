import React, { useState } from 'react'
import { Button, Input, Link } from '@mui/material';
import { inputSignStyle } from '../components/style'

const SigninPage : React.FC =  () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
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

export default SigninPage