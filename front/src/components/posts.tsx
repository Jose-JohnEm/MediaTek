import { Button, Card, Divider, Grid, Input } from "@mui/material";
import { cardStyle, inputCommentStyle, buttonCommentStyle } from '../components/style';
import React, { useState } from "react";
import { borderColor } from "@mui/system";

export function ImagePost() {
    const [isClick, setClick] = useState(false);
    const [comment, setComment] = useState('')
    
    return (
        <div>
            <Card
                variant="outlined"
                sx={cardStyle}
            >
                <Grid container >
                    <Grid item xs={6}>
                        <img src="/mtk.png" alt="Publication" className="post-img"></img>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="post-card-part">
                            <h5>LD2J</h5>
                            <h4>C'est toi</h4>
                            <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </h6>
                            <Grid container>
                                <Grid item xs={3}>
                                    <div className="post-counter">1729</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <button style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                                        <img src="/heart.svg" alt="likes" style={{width: '3em'}}></img>
                                    </button>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className="post-counter">2917</div>
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
                                <Grid container>
                                    <Grid item xs={3}>
                                        <div className="artist-comment">Moi</div>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <div className="text-comment">Ouais la zik est incraoyable t'es pas prêt !</div>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <button style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                                            <img src="/reply.svg" alt="remply" style={{width: '1em'}}></img>
                                        </button>
                                        <button style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                                            <img src="/bin.png" alt="remove" style={{width: '1em'}}></img>
                                        </button>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <div className="artist-comment-reply">Bracama</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="text-comment">De ouuuuuuuuf je suis tellement d'accord ! On est grave corda !</div>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <button style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                                            <img src="/bin.png" alt="remove" style={{width: '1em'}}></img>
                                        </button>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <div className="artist-comment">Bracama</div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className="text-comment">Ouais prêt Ouais la zik est incraoyable t'es as prêt Ouais la zik est incraoyable t'es as prêt</div>
                                    </Grid>
                                </Grid>
                                
                                <Grid container>
                                    <Grid item xs={3}>
                                        <div className="artist-comment">Bracama</div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className="text-comment">Ouais prêt Ouais la zik est incraoyable t'es as prêt Ouais la zik est incraoyable t'es as prêt</div>
                                    </Grid>
                                </Grid>
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
                                href='/news'
                                sx={buttonCommentStyle}
                            >Envoyer</Button>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </div>
    )
}
