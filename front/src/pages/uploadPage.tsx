import React, { ReactNode, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent } from '@mui/material';
import { inputDescriptionStyle, inputSignStyle } from '../components/style'

const UploadPage = () => {
    const [titre, setTitre] = useState('')
    const [category, setCategory] = useState('')
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div className="page-bord-centre">
            <div className="big-card">
                <h2>Publiez votre oeuvre</h2>
                <div style={{textAlign: 'center'}}>
                    <div className="sign-field">
                        <p className="micro-title">Titre</p>
                        <Input
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTitre(ev.target.value)}
                            margin='dense'
                            type='email'
                            disableUnderline={true}
                            sx={inputSignStyle}
                        ></Input>
                    </div>
                    <div className="sign-field">
                        <FormControl sx={{width: '15em'}}>
                            <InputLabel id="demo-simple-select-label"  sx={{fontFamily: 'Quicksand'}}>Catégorie</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value='Photo'
                                label="Catégorie"
                                onChange={(ev: SelectChangeEvent<string>, child: ReactNode): void => setTitre(ev.target.value)}
                                sx={inputSignStyle}
                            >
                                <MenuItem value="photo" sx={inputSignStyle}>Photo</MenuItem>
                                <MenuItem value="video" sx={inputSignStyle}>Vidéo</MenuItem>
                                <MenuItem value="music" sx={inputSignStyle}>Musique</MenuItem>
                                <MenuItem value="book" sx={inputSignStyle}>Livre</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="sign-field">
                        <Input
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setFile(ev.target.value)}
                            margin='dense'
                            type='file'
                            disableUnderline={true}
                            sx={inputSignStyle}
                        ></Input>
                    </div>
                    <div className="sign-field" style={{maxLines:'5', textAlign: 'left'}}>
                        <Input
                            multiline
                            placeholder='Ajoute une description'
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setDescription(ev.target.value)}
                            fullWidth
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
        </div>
    )
}

export default UploadPage