import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Alert, AlertColor, Button, FormControl, FormControlLabel, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar } from '@mui/material';
import { inputDescriptionStyle, inputSignStyle } from '../components/style'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import S3 from 'react-aws-s3'

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

const UploadPage = () => {
    const [titre, setTitre] = useState('')
    const [category, setCategory] = useState('')
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')
    const nav = useNavigate()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [sevCategory, setSevCategory] = useState('error')

    const fileInput = useRef();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            nav('/signin')
        }
    }, [])

    const closeSnack = () => {
        setOpen(false)
    }

    const submitLogins = async (event) => {
        try {
            // event.preventDefault();
            // var file = (fileInput.current as any).files[0]
            // var newFileName = (fileInput.current as any).files[0].name
            // const config = {
            //     bucketName: 'mediatek-media-files',
            //     region: 'eu-west-3',
            //     accessKeyId: 'AKIAX4ONKWV5SADDP7LI',
            //     secretAccessKey: 'mZ8tofHzp8idiZ5HthfjNhNLZ0CM7MN6HNT'
            // }
            // const client = new S3(config)
            // client.uploadFile(file, newFileName).then(data => {
            //     console.log(data)
            //     if (data.status === 204) {
            //         setSevCategory('success')
            //         setMessage('Le fichier a été chargé correctement')
            //         setOpen(true)
            //     }
            //     else {
            //         setSevCategory('error')
            //         setMessage('La soumission a échoué')
            //         setOpen(true)
            //     }
            // })
            // console.log({
            //     title: titre,
            //     category: category,
            //     src: file,
            //     description: description,
            // })
            if (!titre || !category || !file || !description) {
                throw 'Aucun champs ne doit être vide'
            }

            const { data } = await axios.post(`${apiUrl}/auth/user/posts`, {
                title: titre,
                category: category,
                src: file,
                description: description,
            });

            setSevCategory('success')
            setMessage("Ton post a été créé avec succès")
            setOpen(true)
        } catch (error) {
            setSevCategory('error')
            setMessage(error as string)
            setOpen(true)
            console.error(error)
        }
    }

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
                                onChange={(ev: SelectChangeEvent<string>, child: ReactNode): void => setCategory(ev.target.value)}
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
                            ref={fileInput}
                            margin='dense'
                            type='file'
                            disableUnderline={true}
                            sx={inputSignStyle}
                            onChange={ev => setFile(ev.target.value)}
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
                        onClick={submitLogins}
                        sx={{
                            padding: '0.5em',
                            fontFamily: 'Quicksand',
                            fontSize: '1.5em',
                            borderRadius: '1em',
                            borderStyle: 'solid'
                        }}
                    >Suivant</Button>
                    <Snackbar open={open} autoHideDuration={2000} onClose={closeSnack}>
                      <Alert onClose={closeSnack} severity={sevCategory as AlertColor} sx={{ width: '100%' }}>
                        {message}
                      </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

export default UploadPage