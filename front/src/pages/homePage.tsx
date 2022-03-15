import '../App.css'
import { HomeButton } from '../components/mtkButton'
import axios from 'axios'
import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom'

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


const HomePage : React.FC  = () => {
    const storedJwt : string = localStorage.getItem('token')!
    const [jwt, setJwt] = useState(storedJwt || '')
    const nav = useNavigate()
    
    const isAuthed = async () => {
        const { data } = await axios.get(`${apiUrl}/auth/user`);
        if (data.certificat.valid) {
            nav('/news')
        }
    }

    isAuthed()

    return (
        <div className="page-bord">
            <div className="hPage-titles">
                <h1>MediaTek</h1>
                <h2>Bievenue à vous !</h2>
            </div>
            <div className="page-bord">
                <HomeButton text="FIL D'ACTUALITÉ" color="green" href="/news"/>
                <br />
                <HomeButton text="PUBLIER" color="pink" href="/upload"/>
            </div>
        </div>
    )
}

export default HomePage