import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import WaitingRoom from "./pages/WaitingRoom";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/waiting-room" element={<WaitingRoom />}/>
            <Route exact path="/chat-room" element={<ChatRoom />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
