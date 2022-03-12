import { Post } from '../components/posts'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPost, IUser } from '../components/interfaces'

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

const dict = {
  '': `${apiUrl}/posts`,
  '/me':`${apiUrl}/auth/user/posts`,
  '/liked':`${apiUrl}/auth/user/liked`,
  '/saved':`${apiUrl}/auth/user/saved`,
}

const NewsPage : React.FC<{param: string}> = ({ param }) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState<IUser | undefined>()

  function getPosts() {
    (async () => {
      try {
        try {
          var req = await axios.get(`${apiUrl}/auth/user`)
          setUser(req.data)
        }
        catch (e) {

        }
        var { data } = await axios.get(dict[param])
        setPosts(data)
      } catch {

      }
    })()
  }

  useEffect(getPosts, [])

  if (posts.length) {
    return (
      <div>
        {posts.map((post: IPost, i: number) => <Post obj={post} id={post._id} user={user} refresh={getPosts} />)}
      </div>
    )
  }
  else {
    return (
      <div>
        Aucun Post...
      </div>
    )
  }

}

export default NewsPage