import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState, React } from "react";
import { Stomp } from "@stomp/stompjs";
import { APIs } from '../static';
import styles from "../styles/ChatRoom.module.css"
import SockJS from 'sockjs-client'

const ChatRoom = () => {
    const { nickname, roomName } = useParams();
    const navigate = useNavigate();

    const [stompMessageInput, setStompMessageInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [stompChatList, setStompChatList] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [open, setOpen] = useState(null);

    const stompWs = useRef(null);
    const wsRef = useRef(null);
    const chatContainerRef = useRef(null);
    const stompChatContainerRef = useRef(null);
    
    useEffect(() => {
        wsRef.current = new WebSocket(APIs.wsConnection);

        wsRef.current.onopen = () => {
            console.log("웹소켓 연결 성공");
            setOpen(true);
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error: ", error);
        };

        const sock = new SockJS(APIs.stompConnection);
        stompWs.current = Stomp.over(sock);

        
        stompWs.current.onConnect = () => {
            stompWs.current.subscribe(`/sub/${roomName}`, 
            (message) => {
                console.log('도착:', message)
                const newMessage = JSON.parse(message.body);
                console.log(newMessage)
                setStompChatList((prevChatList) => [...prevChatList, newMessage])
            }
            );
        };

        stompWs.current.activate();

        return async () => {
            await sendLeaveMessage();

            await fetch(`${APIs.logout}?nickname=${nickname}`)
            .then(response => {
                if(response.status !== 200) {
                    alert("유저삭제 실패")
                }
            })

            if (stompWs.current) {
                stompWs.current.disconnect();
            }

            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [])

    useEffect(() => {
        if(open) {
            wsRef.current.onmessage = (message) => {
                const parsedMessage = JSON.parse(message.data);
                console.log("Received message: " + message.data);
        
                switch (parsedMessage.id) {
                    case "receiveMessage":
                        receiveMessage(parsedMessage);
                        break;
                    default:
                        console.log(`알 수 없는 메시지: `,parsedMessage);

                }                
            }

            // join 메시지 보내야 함
            sendJoinMessage();
        }
    }, [open]);

    useEffect(() => {
        // 스크롤을 맨 아래로 유지
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatList]);

    useEffect(() => {
        // STOMP 채팅 스크롤을 맨 아래로 유지
        if (stompChatContainerRef.current) {
            stompChatContainerRef.current.scrollTop = stompChatContainerRef.current.scrollHeight;
        }
    }, [stompChatList]);

    

    const sendJoinMessage = () => {

        const message = {
            id: "join",
            roomName: roomName,
            nickname: nickname
        }
        
        console.log("join 메시지 전송")
        const jsonMessage = JSON.stringify(message);
        wsRef.current.send(jsonMessage);
    }

    const receiveMessage = (parsedMessage) => {

        setChatList((prevChatList) => [...prevChatList, parsedMessage])
    }


    const sendStompChat = () => {
        const body = {
            sender: nickname,
            message: stompMessageInput
        };

        stompWs.current.publish({
            destination: `/pub/${roomName}/chats`, 
            body: JSON.stringify(body)
        });
        
        setStompMessageInput("");
    }

    const sendChat = () => {
        const message = {
            id: "sendMessage",
            roomName: roomName,
            nickname: nickname,
            message: messageInput
        }

        const jsonMessage = JSON.stringify(message);
		console.log('Sending message: ' + jsonMessage);
		wsRef.current.send(jsonMessage);

        setMessageInput("");
    }

    const sendLeaveMessage = async () => {
        const message = {
            id : "leave",
            roomName: roomName,
            nickname: nickname
        }

        const jsonMessage = JSON.stringify(message);
		console.log('Sending message: ' + jsonMessage);
		await wsRef.current.send(jsonMessage);
    }

    const exit = async () => {
        console.log(`${nickname} 퇴장`)
        navigate(`/waiting-room/${nickname}`)
    }

    const setStompMessage = (e) => {
        setStompMessageInput(e.target.value);
    }

    const setMessage = (e) => {
        setMessageInput(e.target.value);
    }

    







    return (
        <>
            <div className={styles.chatRoomContainer}>
                <div className={styles.charRoomHeader}>
                    <div></div>
                    <div>{roomName}</div>
                    <button className={styles.exitButton} onClick={exit}>나가기</button>
                </div>

                <div className={styles.chatBoxes}>


                    <div className={styles.chatBox}>
                        <div>No STOMP Chat</div>
                        <div className={styles.chats} ref={chatContainerRef}>


                            {chatList.map((item, index) => (
                                <div key={index} className={styles.chat}>
                                    {item.sender}: {item.message}
                                </div>
                            ))}
                                
                        </div>

                        <div className={styles.inputBox}>
                            <input className={styles.chatInput} onChange={(e) => setMessage(e)} value={messageInput}></input>
                            <button className={styles.sendButton} onClick={sendChat}>보내기</button>
                        </div>

                    </div>



                    <div className={styles.chatBox}>
                        <div>STOMP Chat</div>
                        <div className={styles.chats} ref={stompChatContainerRef}>

                            {stompChatList.map((item, index) => (
                                <div key={index} className={styles.chat}>
                                    {item.sender}: {item.message}
                                </div>
                            ))}
                                
                        </div>

                        <div className={styles.inputBox}>
                            <input className={styles.chatInput} onChange={(e) => setStompMessage(e)} value={stompMessageInput} ></input>
                            <button className={styles.sendButton} onClick={sendStompChat}>보내기</button>
                        </div>

                    </div>


                </div>

            </div>
        </>
    )
}

export default ChatRoom;