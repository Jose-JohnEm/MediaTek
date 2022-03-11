import { Button, Card, Divider, Grid, Input } from "@mui/material";
import { cardStyle, inputCommentStyle, buttonCommentStyle } from '../components/style';
import React, { useEffect, useState } from "react";
import { IComment, IPost } from './interfaces'
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


export const Post : React.FC<{obj: IPost, id: string}> = (props) => {
    const [isClick, setClick] = useState(false);
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
            console.log("Mouais");

        }
        catch (err) {
            nav('/signin')
        }
    }

    return (
        <div>
            <Card
                variant="outlined"
                sx={cardStyle}
            >
                <Grid container >
                    <Grid item xs={6}>
                        <img src={props.obj.src} alt={props.obj.title} className="post-img"></img>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="post-card-part">
                            <h5>{props.obj.artist.name}</h5>
                            <h4>{props.obj.title}</h4>
                            <h6>{props.obj.description}</h6>
                            <Grid container>
                                <Grid item xs={3}>
                                    <div className="post-counter">{props.obj.likes}</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <button style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                                        <img src="/heart.svg" alt="likes" style={{width: '3em'}}></img>
                                    </button>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className="post-counter">{props.obj.views}</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <img src="/eye.svg" alt="vues" style={{width: '3em'}}></img>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                <Divider light sx={{color: '#dd2ac5', fontSize: '1.2em'}} variant="middle" textAlign="center">Commentaires</Divider>
                <div className="comment-section">
                    <Grid container>
                        <Grid item xs={8}>
                            <div style={{overflowY: 'scroll', marginTop:'0.5em', maxHeight: '11em'}}>
                                {props.obj.comments.map((comment: IComment, i: number) => <Comment parent={props.obj} obj={comment} id={comment._id} />)}
                            </div>
                        </Grid>
                        <Divider light orientation="horizontal" />
                        <Grid item xs={4}>
                            <Input
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setComment(ev.target.value)}
                                margin='dense'
                                type='text'
                                disableUnderline={true}
                                placeholder="Un commentaire à partager?"
                                multiline
                                sx={inputCommentStyle}
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
                    </Grid>
                </div>
            </Card>
        </div>
    )
}
