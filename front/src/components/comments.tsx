import { Grid } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { IComment, IPost, IReply, IUser } from "./interfaces"

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

export const Reply : React.FC<{obj: IReply, id: string, parent: any, comment: string, user: IUser, refresh: Function}> = (props) => {
    const nav = useNavigate()

    async function editReply() {
        try {
            await axios.put(`${apiUrl}/auth/user/comment`, {
                parent: 'comment',
                post_id: props.parent.parent._id,
                comment_id: props.parent.obj._id,
                reply_id: props.obj._id,
                comment: props.comment
            })
            props.refresh()
        }
        catch (err) {
            nav('/signin')
        }
    }

    async function removeReply() {
        try {
            await axios.delete(`${apiUrl}/auth/user/comment`, {
                data: {
                    parent: 'comment',
                    post_id: props.parent.parent._id,
                    comment_id: props.parent.obj._id,
                    reply_id: props.obj._id,
                    comment: props.comment
                }
            })
            props.refresh()
        }
        catch (err) {
            nav('/news#' + props.id)
        }
    }
    if (props.user) {
        return (
            <>
                <Grid container>
                    <Grid item xs={5}>
                        <div className="artist-comment-reply">{props.obj.writer_pseudo}</div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="text-comment">{props.obj.comment}</div>
                    </Grid>

                    { (props.user._id == props.obj.writer_id) &&
                        <Grid item xs={1}>
                            <button onClick={editReply} style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                                <img src="/pencil.svg" alt="remply" style={{width: '1em'}}></img>
                            </button>
                            <button onClick={removeReply} style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                                <img src="/bin.png" alt="remove" style={{width: '1em'}}></img>
                            </button>
                        </Grid>
                    }
                </Grid>
            </>
        )
    }
    else {
        return (
            <>
                <Grid container>
                    <Grid item xs={4}>
                        <div className="artist-comment-reply">{props.obj.writer_pseudo}</div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="text-comment">{props.obj.comment}</div>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export const Comment : React.FC<{obj: IComment, id: string, parent: IPost, user: IUser, comment: string, refresh: Function}> = (props) => {
    const nav = useNavigate()

    async function handleReply() {
        try {
            await axios.post(`${apiUrl}/auth/user/comment`, {
                parent: 'comment',
                post_id: props.parent._id,
                comment_id: props.id,
                comment: props.comment
            })
            props.refresh()
        }
        catch (err) {
            nav('/signin')
        }
    }

    async function editComment() {
        try {
            await axios.put(`${apiUrl}/auth/user/comment`, {
                parent: 'post',
                post_id: props.parent._id,
                comment_id: props.id,
                comment: props.comment
            })
            props.refresh()
        }
        catch (err) {
            nav('/signin')
        }
    }

    async function removeComment() {
        try {
            await axios.delete(`${apiUrl}/auth/user/comment`, {
                data: {
                    parent: 'post',
                    post_id: props.parent._id,
                    comment_id: props.obj._id
                }
            })
            props.refresh()
        }
        catch (err) {
            nav('/news#' + props.id)
        }
    }

    if (props.user) {
        return (
            <>
                <Grid container>
                    <Grid item xs={3}>
                        <div className="artist-comment">{props.obj.writer_pseudo}</div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="text-comment">{props.obj.comment}</div>
                    </Grid>

                    <Grid item xs={2}>
                        <button onClick={handleReply} style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                            <img src="/reply.svg" alt="remply" style={{width: '1em'}}></img>
                        </button>
                    { (props.user._id == props.obj.writer_id) && <>
                        <button onClick={editComment} style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                            <img src="/pencil.svg" alt="remply" style={{width: '1em'}}></img>
                        </button>
                        <button onClick={removeComment} style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                            <img src="/bin.png" alt="remove" style={{width: '1em'}}></img>
                        </button>
                        </>
                    }
                    </Grid>
                </Grid>
                {props.obj.replyes.map((reply: IReply, i: number) => <Reply obj={reply} id={reply._id} parent={props} comment={props.comment} user={props.user} refresh={props.refresh}/>)}
            </>
        )
    }
    else {
        return (
            <>
                <Grid container>
                    <Grid item xs={3}>
                        <div className="artist-comment">{props.obj.writer_pseudo}</div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="text-comment">{props.obj.comment}</div>
                    </Grid>
                </Grid>
                {props.obj.replyes.map((reply: IReply, i: number) => <Reply obj={reply} id={reply._id} parent={props} comment={props.comment} user={props.user} refresh={props.refresh}/>)}
            </>
        )
    }
}