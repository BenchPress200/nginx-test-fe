import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/Home.module.css'

const Home = () => {
    const [nicknameInput, setNicknameInput] = useState("");
    const navigate = useNavigate();

    const setNickname = (e) => {
        setNicknameInput(e.target.value);
    }

    const login = () => {
        navigate(`/waiting-room/${nicknameInput}`);
    }

    return (
        <>
            <div className={styles.homeContainer}>

                <div className={styles.loginBox}>

                    <input className={styles.nicknameInput} placeholder='nickname' onInput={(e) => setNickname(e)}></input>
                    <button className={styles.loginButton} onClick={login}>Login</button>

                </div>
                
            </div>
        </>
    );
}

export default Home;