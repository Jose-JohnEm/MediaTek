import React, { useState } from 'react'
import { Button, Input } from '@mui/material';
import { inputSignStyle } from '../components/style'

const ValidationPage : React.FC =  () => {
    const [code, setCode] = useState('')
    
    return (
        <div className="page-bord-centre">
            <h2>Confirmez votre code secret</h2>
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
                        color="secondary"
                        href='/validation'
                        sx={{
                            fontFamily: 'Quicksand',
                            fontSize: '1em',
                            borderStyle: 'none',
                            margin: '1em 10em'
                        }}
                    >Besoin d'un nouveau lien ?</Button>
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

export default ValidationPage