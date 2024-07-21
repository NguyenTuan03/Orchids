import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Detail from "./components/Detail";
import Contact from "./components/Contact";
import "bootstrap/dist/css/bootstrap.css";
import "hover.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import News from "./components/News";
import About from "./components/About";
import Manage from "./components/Manage";
import Add from "./components/Add";
function App() {
    return (
        <div className="wrapper">
            <Navigation />
            <Routes>
                <Route path="/" element={<Container />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/news" element={<News />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/add" element={<Add />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
