import styles from "../styles/ChatRoom.module.css"

const ChatRoom = () => {
    return (
        <>
            <div className={styles.chatRoomContainer}>
                <div className={styles.charRoomHeader}>
                    <div></div>
                    <div>1 번 방</div>
                    <button className={styles.exitButton}>나가기</button>
                </div>

                <div className={styles.chatBoxes}>


                    <div className={styles.chatBox}>
                        <div>STOMP Chat</div>
                        <div className={styles.chats}>
                                
                        </div>

                        <div className={styles.inputBox}>
                            <input className={styles.chatInput}></input>
                            <button className={styles.sendButton}>보내기</button>
                        </div>

                    </div>

                    <div className={styles.chatBox}>
                        <div>No STOMP Chat</div>
                        <div className={styles.chats}>
                                
                        </div>

                        <div className={styles.inputBox}>
                            <input className={styles.chatInput}></input>
                            <button className={styles.sendButton}>보내기</button>
                        </div>

                    </div>


                </div>

            </div>
        </>
    )
}

export default ChatRoom;