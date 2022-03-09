import '../App.css'
import { HomeButton } from '../components/mtkButton'


const HomePage = () => {
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