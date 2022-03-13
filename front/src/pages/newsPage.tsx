import { Post } from '../components/posts'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPost, IUser } from '../components/interfaces'
import { Backdrop, CircularProgress } from '@mui/material';

const apiUrl = 'http://localhost:8080'

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url as string);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers!.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const dict : {[name: string] :string} = {
  '': `${apiUrl}/posts`,
  '/me':`${apiUrl}/auth/user/posts`,
  '/liked':`${apiUrl}/auth/user/liked`,
  '/saved':`${apiUrl}/auth/user/saved`,
}

const NewsPage : React.FC<{param: string}> = ({ param }) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState<IUser | undefined>()
  const [backdrop, setBackdrop] = useState(true)

  function getPosts() {
    (async () => {
      try {
        try {
          var req = await axios.get(`${apiUrl}/auth/user`)
          setUser(req.data)
        }
        catch (err) {

        }
        var { data } = await axios.get(dict[param])
        if (data && data.length > 0) {
          setPosts(data.reverse())
        }
        setBackdrop(false)
      } catch (err) {
        console.log(err)
        setBackdrop(false)
      }
    })()
  }

  useEffect(getPosts, [])


  const NothingMessage : React.FC = () => {

    if (backdrop == false) {
      return (
        <div>
          <h2 style={{marginTop: '5em'}}>Mince, il n'y a aucun post...</h2>
        </div>
      )
    }
    return (
      <></>
    )

  }

  if (posts.length) {
    return (
      <div style={{margin: '0', height: '100%', overflow: 'hidden'}}>
        {posts.map((post: IPost, i: number) => <Post obj={post} key={i} id={post._id} user={user!} refresh={getPosts} />)}
      </div>
    )
  }
  else {
    return (
      <>
        <NothingMessage />
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
      </>
    )
  }
}

export default NewsPage