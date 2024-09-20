import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/WaitingRoom.module.css';
import { APIs } from '../static';

const WaitingRoom = () => {
    const navigate = useNavigate();
    const { nickname } = useParams();
    const [roomNameInput, setRoomNameInput] = useState("");
    const [activeUsers, setActiveUsers] = useState([]);

    const setRoomName = (e) => {
        setRoomNameInput(e.target.value);
    }

    const findActiveUsers = () => {
        fetch(APIs.activeUsers)
            .then(response => {
                console.log(response)

                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data)
                setActiveUsers(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        findActiveUsers();
    }, []);
    
    const join = () => {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
              },
            body: JSON.stringify({
                nickname: nickname,
                roomName: roomNameInput
            }),
        }

        fetch(APIs.joinUser, option)
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    navigate(`/chat-room/${nickname}/${roomNameInput}`);
                    return;
                }

                alert('유저등록 실패');
            })
            .catch(error => {
                console.log(error);
            })

        
    }


    return (
        <>
            <div className={styles.waitingRoomContainer}>
                <div className={styles.box}>
                    <div className={styles.leftBox}>
                        <div className={styles.leftBoxTitle}>방 접속 유저</div>

                        <div className={styles.userBox}>
                            {activeUsers.map((item, index) => (
                                <div key={index} className={styles.activeUser}>
                                    [{item.roomName} 번 방] {item.nickname} 
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className={styles.rightBox}>
                        <div className={styles.myNickname}>{nickname}</div>                        

                        <input className={styles.roomNameInput} placeholder='room name' onInput={(e) => setRoomName(e)}></input>

                        <button className={styles.joinButton} onClick={join}>join</button>

                    </div>

                </div>
            </div>
        </>
    )

}

export default WaitingRoom;