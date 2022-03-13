import React, { useEffect, useState } from 'react'
import { Alert, AlertColor, Backdrop, Button, CircularProgress, Grid, Input, Snackbar } from '@mui/material';
import { cardStyle, inputSignStyle } from '../components/style'
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

const UploadPage = () => {
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const nav = useNavigate()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [sevCategory, setSevCategory] = useState('error')
    const [backdrop, setBackdrop] = useState(false)

    const [fileContent, setFileContent] = useState<FileList | null>(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            nav('/signin')
        }
    }, [])

    const closeSnack = () => {
        setOpen(false)
    }

    const uploadFile = async () => {
        const formData = new FormData()

        formData.append("file", fileContent![0])

        console.log(fileContent);
        console.log(formData);
        try {
            const res = await axios.post(`${apiUrl}/aws`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })
            return res.data.Location
        } catch (exception) {
            throw Error('Le partage a échoué...')
        }
    }

    const submitPost = async () => {
        setBackdrop(true)
        try {
            if (titre === '' || description === '') {
                throw Error('Aucun champs ne doit être vide')
            }

            if (fileContent![0].name === '') {
                throw Error('Vous devez importer un fichier')
            }

            await axios.post(`${apiUrl}/auth/user/posts`, {
                title: titre,
                category: "music",
                src: await uploadFile(),
                description: description,
            });

            setSevCategory('success')
            setMessage("Ton post a été créé avec succès")
            setBackdrop(false)
            setOpen(true)
        } catch (error) {
            if (typeof error != 'string') {
                setBackdrop(false)
                setSevCategory('error')
                setMessage('Erreur dûe au fichier : Est-il manquant ?')
                setOpen(true)
            }
            setBackdrop(false)
            setSevCategory('error')
            setMessage(error as string)
            setOpen(true)
            console.error(error)
        }
    }

    return (
        <div style={cardStyle as React.CSSProperties} className="page-bord-centre">
            <div>
                <h2 style={{margin: '1em'}}>Publiez votre oeuvre</h2>
                <div style={{textAlign: 'center'}}>
                <Grid container spacing={5}>
                    <Grid style={{textAlign: 'right'}} item xs={4}>
                        <p className="micro-title">Titre</p>
                    </Grid>
                    <Grid item xs={5} style={{textAlign: 'left'}}>
                        <Input
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTitre(ev.target.value)}
                            margin='dense'
                            type='text'
                            disableUnderline={true}
                            sx={inputSignStyle}
                        ></Input>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left'}}></Grid>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        <p className="micro-title">Description</p>
                    </Grid>
                    <Grid item xs={6} style={{textAlign: 'left'}}>
                        <Input
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setDescription(ev.target.value)}
                            margin='dense'
                            type='text'
                            fullWidth
                            disableUnderline={true}
                            sx={{...inputSignStyle, ...{height: '8em'}}}
                        ></Input>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type='file'
                            style={inputSignStyle as React.CSSProperties}
                            onChange={ev => setFileContent(ev.target.files)}
                            accept='.mp3,.mp4,.m4a,.wav,.pdf,.jpg,.jepg'
                        ></input>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={submitPost}
                            color="secondary"
                            variant="contained"
                            endIcon={<SendIcon />}
                            style={{backgroundColor: '#107050'}}
                        >Suivant</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {' '}
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={2000} onClose={closeSnack}>
                    <Alert onClose={closeSnack} severity={sevCategory as AlertColor} sx={{ width: '100%' }}>
                    {message}
                    </Alert>
                </Snackbar>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                </div>
            </div>
        </div>
    )
}

export default UploadPage