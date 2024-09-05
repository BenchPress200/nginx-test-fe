import styles from '../styles/WaitingRoom.module.css';

const WaitingRoom = () => {
    return (
        <>
            <div className={styles.waitingRoomContainer}>
                <div className={styles.box}>
                    <div className={styles.leftBox}>
                        <div className={styles.leftBoxTitle}>방 접속 유저</div>
                        <div className={styles.userBox}></div>
                    </div>

                    <div className={styles.rightBox}>
                        <div className={styles.myNickname}>내 닉네임</div>                        
                        <input className={styles.roomNumberInput} placeholder='room number'></input>
                        <button className={styles.joinButton}>join</button>

                    </div>

                </div>
            </div>
        </>
    )

}

export default WaitingRoom;