import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material'
import { Google } from '@mui/icons-material';

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

export const GoogleLog : React.FC<{messageSetter: Function, openSetter: Function}> = ({messageSetter, openSetter}) => {
    const nav = useNavigate()

    const onSuccess = (res: any) => {
        console.log('[Login Sucess] user:', res.profileObj);

        (async () => {
            try {
                const { data } = await axios.post(`${apiUrl}/login`, {
                    email: res.profileObj.email,
                    password: res.profileObj.googleId,
                })
                localStorage.setItem('token', data.token);

                try {
                    await axios.get(`${apiUrl}/auth/user`)
                    nav('/news')
                }
                catch(err: any) {
                    nav('/validation')
                    throw Error('Non')
                }
            }
            catch(err :any) {
                try {
                    const ax : any = await axios.post(`${apiUrl}/register`, {
                        email: res.profileObj.email,
                        password: res.profileObj.googleId,
                        pseudo: res.profileObj.name,
                    })
                    localStorage.setItem('token', ax.data.token);
                    nav('/validation')
                }
                catch(err :any) {
                    messageSetter("L'authentification via Google a échoué")
                    openSetter(true)
                }
            }
        })()
    }

    const onFailure = (res: any) => {
        console.log('[Login Failed] res:', res)
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: '822218891544-pokpikoujc37jn7d57lakjtj33tcp9kr.apps.googleusercontent.com',
        isSignedIn: true,
        accessType: 'offline'
    })

    return (
        <div>
            <Button
                endIcon={<Google fontSize='large' />}
                onClick={signIn}
            >J'ai un compte Google</Button>
        </div>
    )
}

