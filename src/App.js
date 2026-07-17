import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BedBooking from "./pages/BedBooking";
import Tracking from "./pages/Tracking";
import Medicines from "./pages/Medicines";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
        <Header />
            <Navbar />
            <Routes>
                <Route path="/bedbooking" element={<BedBooking />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/meds" element={<Medicines />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;