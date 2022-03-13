import { Button, Card, Divider, Grid, Input } from "@mui/material";
import { cardStyle, inputCommentStyle, buttonCommentStyle } from '../components/style';
import React, { useState } from "react";
import { IComment, IPost, IUser } from './interfaces'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Comment } from './comments'
import ReactPlayer from 'react-player'
import SendIcon from '@mui/icons-material/Send';
import { BookmarkAddedRounded, BookmarkAddOutlined, FavoriteBorderRounded, FavoriteRounded, RemoveRedEyeRounded, PictureAsPdfRounded } from "@mui/icons-material";

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


export const Post : React.FC<{obj: IPost, id: string, user: IUser, refresh: Function}> = (props) => {
    const [comment, setComment] = useState('')
    const nav = useNavigate()

    async function handleComment() {
        try {
            await axios.post(`${apiUrl}/auth/user/comment`, {
                parent: 'post',
                post_id: props.id,
                comment: comment
            })
            setComment('')
            props.refresh()
        }
        catch (err) {
            nav('/signin')
        }
    }

    async function handleLike() {
        if (props.user) {
            try {
                if (props.user.liked_ids.includes(props.id)) {
                    await axios.delete(`${apiUrl}/auth/user/liked`, {
                        data: {
                            id: props.id,
                        }
                    })
                }
                else {
                    await axios.post(`${apiUrl}/auth/user/liked`, {
                        id: props.id
                    })
                }
                props.refresh()
            }
            catch (err) {
                nav('/signin')
            }
        }
    }

    async function handleSave() {
        if (props.user) {
            try {
                if (props.user.saved_ids.includes(props.id)) {
                    await axios.delete(`${apiUrl}/auth/user/saved`, {
                        data: {
                            id: props.id,
                        }
                    })

                }
                else {
                    await axios.post(`${apiUrl}/auth/user/saved`, {
                        id: props.id
                    })
                }
                props.refresh()

            }
            catch (err) {
                nav('/signin')
            }
        }
    }

    async function addView() {
        try {
            await axios.post(`${apiUrl}/posts/view`, {
                id: props.id
            })
        }
        catch (err) {

        }
    }

    const Content : React.FC = () => {

        if (props.obj.src.endsWith(".mp3") || props.obj.src.endsWith(".wav") || props.obj.src.endsWith(".m4a")) {
            return (
                <ReactPlayer style={{marginTop: '-7em'}} className="post-img" loop controls url={props.obj.src} />
            )
        }
        if (props.obj.src.endsWith(".mp4")) {
            return (
                <ReactPlayer className="post-img" loop controls url={props.obj.src} />
            )
        }
        if (props.obj.src.endsWith(".pdf")) {
            return (
                <>
                    <Button
                        href={props.obj.src}
                        color="secondary"
                        variant="contained"
                        style={{marginTop: "10em"}}
                        endIcon={<PictureAsPdfRounded/>}
                    >Cliquez ici pour voir le livre</Button>
                </>
            )
        }
        else {
            return (
                <img src={props.obj.src} alt={props.obj.title} className="post-img"></img>
            )
        }
    }

    return (
        <div style={{margin: '5em 0em'}} >
            <Card
                onMouseEnter={addView}
                variant="outlined"
                sx={cardStyle}
            >
                <Grid container >
                    <Grid item xs={8}>
                        <div style={{textAlign: 'center'}}>
                            <Content />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="post-card-part">
                            <h5>{props.obj.artist.name}</h5>
                            <h4>{props.obj.title}</h4>
                            <h6>{props.obj.description}</h6>
                            <Grid container>
                                <Grid item xs={2}>
                                    <div className="post-counter">{props.obj.likes}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        onClick={handleLike}
                                        style={{border: 'none',
                                            background: 'transparent',
                                            borderRadius: '2em',
                                            fontSize: '5em'
                                        }}
                                    >
                                        {(props.user && props.user.liked_ids.includes(props.id)) ? <FavoriteRounded fontSize="large" color="secondary"/> : <FavoriteBorderRounded fontSize="large" color="secondary"/>}
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className="post-counter">{props.obj.views}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        style={{border: 'none',
                                            background: 'transparent',
                                            borderRadius: '2em',
                                            fontSize: '5em'
                                        }}
                                    >
                                        <RemoveRedEyeRounded fontSize="large" color="secondary"/>
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        onClick={handleSave}
                                        style={{border: 'none',
                                            background: 'transparent',
                                            borderRadius: '2em'
                                        }}
                                    >
                                        {(props.user && props.user.saved_ids.includes(props.id)) ? <BookmarkAddedRounded fontSize="large" color="secondary"/> : <BookmarkAddOutlined fontSize="large" color="secondary"/>}
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                {((props.user) || (props.obj.comments.length > 0)) && <>
                    <Divider light sx={{divider: { backgroundColor: 'black'}, color: '#9e31f8', fontSize: '1.2em'}} variant="middle" textAlign="center">Commentaires</Divider>
                    <div className="comment-section">
                        <Grid container>
                            <Grid item xs={(props.user == undefined) ? 12 : 8}>
                                <div style={{overflowY: 'auto', marginTop:'0.5em', maxHeight: '11em'}}>
                                    {
                                        (props.obj.comments.length > 0) && props.obj.comments.map((com: IComment, i: number) => <Comment parent={props.obj} obj={com} key={i} id={com._id} comment={comment} refresh={props.refresh} user={props.user}/>)
                                        || (props.obj.comments.length == 0) && <h5 style={{color: 'black', marginTop: '1.7em'}}>Soyez le premier à commenter</h5>
                                    }
                                </div>
                            </Grid>
                            {(props.user != undefined) &&
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={11.5}>
                                            <Input
                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setComment(ev.target.value)}
                                                margin='dense'
                                                type='text'
                                                disableUnderline={true}
                                                placeholder="Un commentaire à partager?"
                                                fullWidth
                                                sx={inputCommentStyle}
                                                value={comment}
                                            ></Input>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                color="secondary"
                                                variant="outlined"
                                                href={'#'+props.id}
                                                sx={buttonCommentStyle}
                                                onClick={handleComment}
                                                endIcon={<SendIcon />}
                                            >Envoyer</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </div>
                </>
                }
            </Card>
        </div>
    )
}
