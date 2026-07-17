import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <nav>
                <Link to="/bedbooking">Bed Booking</Link>
                <Link to="/tracking">Ambulance Tracking</Link>
                <Link to="/meds">Medicines</Link>
            </nav>
        </div>
    );
};

export default Navbar;