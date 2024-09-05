import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import WaitingRoom from "./pages/WaitingRoom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/waiting-room" element={<WaitingRoom />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
