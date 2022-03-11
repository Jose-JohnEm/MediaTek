import { Post } from '../components/posts'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPost } from '../components/interfaces'

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

const NewsPage = () => {
    const [posts, setPosts] = useState([])

    function getPosts() {
        axios.get(`${apiUrl}/posts`)
            .then((data) => setPosts(data.data))
    }

    useEffect(getPosts, [])

    return (
        <div>

            {posts.map((post: IPost, i: number) => <Post obj={post} id={post._id} />)}
            {/* {posts.map((object, i) => <ObjectRow obj={object} key={i} />)} */}
        </div>
    )
}

export default NewsPage