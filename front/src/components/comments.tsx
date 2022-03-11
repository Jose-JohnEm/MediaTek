import { Grid } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { IComment, IPost, IReply } from "./interfaces"

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

export const Reply : React.FC<{obj: IReply, id: string}> = (props) => {
    return (
        <>
            <Grid container>
                <Grid item xs={5}>
                    <div className="artist-comment-reply">{props.obj.writer_pseudo}</div>
                </Grid>
                <Grid item xs={6}>
                    <div className="text-comment">{props.obj.comment}</div>
                </Grid>
                <Grid item xs={1}>
                    <button style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                        <img src="/bin.png" alt="remove" style={{width: '1em'}}></img>
                    </button>
                </Grid>
            </Grid>
        </>
    )
}

export const Comment : React.FC<{obj: IComment, id: string, parent: IPost}> = (props) => {
    const nav = useNavigate()

    async function removeComment() {
        await axios.delete(`${apiUrl}/auth/user/comment`, {
            data: {
                parent: 'post',
                post_id: props.parent._id,
                comment_id: props.obj._id
            }
        })
        nav('/news#' + props.id)

    }

    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                    <div className="artist-comment">{props.obj.writer_pseudo}</div>
                </Grid>
                <Grid item xs={7}>
                    <div className="text-comment">{props.obj.comment}</div>
                </Grid>
                <Grid item xs={1}>
                    <button style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                        <img src="/reply.svg" alt="remply" style={{width: '1em'}}></img>
                    </button>
                    <button onClick={removeComment} style={{border: 'none', background: 'transparent', borderRadius: '2em'}}>
                        <img src="/bin.png" alt="remove" style={{width: '1em'}}></img>
                    </button>
                </Grid>
            </Grid>
            {props.obj.replyes.map((reply: IReply, i: number) => <Reply obj={reply} id={reply._id} />)}
        </>
    )
}