import { Button, Card, Divider, Grid, Input } from "@mui/material";
import { cardStyle, inputCommentStyle, buttonCommentStyle } from '../components/style';
import React, { useEffect, useState } from "react";
import { IComment, IPost, IUser } from './interfaces'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Comment } from './comments'

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
    const [isClick, setClick] = useState(false);
    const [comment, setComment] = useState('')
    const [imageSrc, setImageSrc] = useState('')
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
            props.refresh()
        }
        catch (err) {

        }
    }

    return (
        <div>
            <Card
                onMouseEnter={addView}
                variant="outlined"
                sx={cardStyle}
            >
                <Grid container >
                    <Grid item xs={6}>
                        <img src={imageSrc} alt={props.obj.title} className="post-img"></img>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="post-card-part">
                            <h5>{props.obj.artist.name}</h5>
                            <h4>{props.obj.title}</h4>
                            <h6>{props.obj.description}</h6>
                            <Grid container>
                                <Grid item xs={2}>
                                    <div className="post-counter">{props.obj.likes}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <button
                                        onClick={handleLike}
                                        style={{border: 'none',
                                            background: 'transparent',
                                            borderRadius: '2em'
                                        }}>
                                        <img src="/heart.svg" className={(props.user && props.user.liked_ids.includes(props.id)) ? 'micro-buttons-already-stated' : 'micro-buttons'}
                                            alt="likes"
                                        ></img>
                                    </button>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className="post-counter">{props.obj.views}</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <img src="/eye.svg" alt="vues" style={{width: '3em'}}></img>
                                </Grid>
                                <Grid item xs={2}>
                                    <button
                                        onClick={handleSave}
                                        style={{border: 'none',
                                            background: 'transparent',
                                            borderRadius: '2em'
                                        }}>
                                        <img src="/save.png" className={(props.user && props.user.saved_ids.includes(props.id)) ? 'micro-buttons-already-stated' : 'micro-buttons'}
                                            alt="likes"
                                        ></img>
                                    </button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                <Divider light sx={{color: '#dd2ac5', fontSize: '1.2em'}} variant="middle" textAlign="center">Commentaires</Divider>
                <div className="comment-section">
                    <Grid container>
                        <Grid item xs={(props.user == undefined) ? 12 :8}>
                            <div style={{overflowY: 'scroll', marginTop:'0.5em', maxHeight: '11em'}}>
                                {props.obj.comments.map((com: IComment, i: number) => <Comment parent={props.obj} obj={com} id={com._id} comment={comment} refresh={props.refresh} user={props.user}/>)}
                            </div>
                        </Grid>
                        <Divider light orientation="horizontal" />

                        {(props.user != undefined) && 
                            <Grid item xs={4}>
                                <Input
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setComment(ev.target.value)}
                                    margin='dense'
                                    type='text'
                                    disableUnderline={true}
                                    placeholder="Un commentaire à partager?"
                                    multiline
                                    sx={inputCommentStyle}
                                    value={comment}
                                ></Input>
                                <br />
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    href={'#'+props.id}
                                    sx={buttonCommentStyle}
                                    onClick={handleComment}
                                >Envoyer</Button>
                            </Grid>
                        }
                    </Grid>
                </div>
            </Card>
        </div>
    )
}
