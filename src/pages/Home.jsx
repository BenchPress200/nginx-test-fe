import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css'

const Home = () => {
    return (
        <>
            <div className={styles.homeContainer}>

                <div className={styles.loginBox}>

                    <input className={styles.nicknameInput} placeholder='nickname'></input>
                    <button className={styles.loginButton}>Login</button>

                </div>
                
            </div>
        </>
    );
}

export default Home;