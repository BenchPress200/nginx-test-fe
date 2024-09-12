import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import WaitingRoom from "./pages/WaitingRoom";
import ChatRoom from "./pages/ChatRoom";
import { URL } from './static'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path={URL.home} element={<Home />}/>
            <Route exact path={URL.waitingRoom} element={<WaitingRoom />}/>
            <Route exact path={URL.chatRoom} element={<ChatRoom />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
