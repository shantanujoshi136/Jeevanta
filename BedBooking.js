import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./BedBooking.css";
import "./BookingSummary.css";

import useNearbyHospitals from "../hooks/useNearbyHospitals";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BedBooking = () => {

    const [location, setLocation] = useState({
        lat: null,
        lng: null,
    });

    const [selectedHospital, setSelectedHospital] = useState(null);

const [bedBooked, setBedBooked] = useState(false);

const patient = {

    name: "Shantanu Joshi",

    age: 20,

    gender: "Male",

    bloodGroup: "B+",

    phone: "+91 9876543210",

    emergencyContact: "+91 9898989898",

    allergies: "No Known Allergies",

    previousDiseases: "Asthma",

    previousReports: [

        "Blood Test.pdf",

        "ECG Report.pdf",

        "Chest X-Ray.pdf"

    ]

};

const doctor = {

    name:"Dr. Rahul Sharma",

    specialization:"General Physician",

    experience:"12 Years",

    room:"Room 204"

};

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                console.log("Latitude:", position.coords.latitude);
                console.log("Longitude:", position.coords.longitude);

                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });

            },

            (err) => {
                console.log(err);
                alert("Please allow location access.");
            }

        );

    }, []);

    const { hospitals, loading, error } = useNearbyHospitals(
        location.lat,
        location.lng
    );

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading nearby hospitals...</h2>;
    }

    if (error) {
        return <h2 style={{ textAlign: "center" }}>{error}</h2>;
    }

    return (

        <div className="bed-booking">

            <h1>Nearby Hospitals</h1>

            {hospitals.length === 0 && (
                <div className="no-hospital">
                    No nearby hospitals with beds available were found.
                </div>
            )}

            <div className="map-container">

                <MapContainer
                    center={[location.lat, location.lng]}
                    zoom={13}
                    className="map"
                >

                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* User Marker */}

                    <Marker position={[location.lat, location.lng]}>
                        <Popup>
                            <strong>Your Current Location</strong>
                        </Popup>
                    </Marker>

                    {/* Hospital Markers */}

                    {hospitals.map((hospital) => (

                        <Marker
                            key={hospital._id}
                            position={[
                                hospital.latitude,
                                hospital.longitude,
                            ]}
                        >

                            <Popup>

                                <h3>{hospital.name}</h3>

                                <p>📍 {hospital.address}</p>

                                <p>
                                    🛏️ Available Beds: {hospital.availableBeds}
                                </p>

                            </Popup>

                        </Marker>

                    ))}

                </MapContainer>

            </div>

            {hospitals.length > 0 && (

                <div className="hospital-list">

                    <h2>
                        Hospitals Available ({hospitals.length})
                    </h2>

                    {hospitals.map((hospital) => (

                        <div
                            className="hospital-card"
                            key={hospital._id}
                        >

                            <div className="hospital-info">

                                <h3>{hospital.name}</h3>

                                <p>📍 {hospital.address}</p>

                                <p>
                                    🛏️ Available Beds : {hospital.availableBeds}
                                </p>

                            </div>

                            <button

className="book-btn"

onClick={()=>{
    setSelectedHospital(hospital);
    setBedBooked(true);
}}

>

Book Now

</button>

                        </div>

                    ))}

                </div>

            )}

            {bedBooked && (

<div className="booking-summary">

<h1>

✅ Bed Reserved Successfully

</h1>

<div className="summary-grid">

<div className="summary-card">

<h2>

🏥 Hospital Information

</h2>

<p><strong>Name:</strong> {selectedHospital.name}</p>

<p><strong>Address:</strong> {selectedHospital.address}</p>

<p><strong>Available Beds:</strong> {selectedHospital.availableBeds}</p>

<p><strong>Admission Status:</strong> Confirmed</p>

</div>

<div className="summary-card">

<h2>

👤 Patient Details

</h2>

<p><strong>Name:</strong> {patient.name}</p>

<p><strong>Age:</strong> {patient.age}</p>

<p><strong>Gender:</strong> {patient.gender}</p>

<p><strong>Blood Group:</strong> {patient.bloodGroup}</p>

<p><strong>Phone:</strong> {patient.phone}</p>

<p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>

</div>

<div className="summary-card">

<h2>

👨‍⚕️ Assigned Doctor

</h2>

<p><strong>{doctor.name}</strong></p>

<p>{doctor.specialization}</p>

<p>{doctor.experience}</p>

<p>{doctor.room}</p>

</div>

<div className="summary-card">

<h2>

📋 Medical History

</h2>

<p>

Previous Disease :

{patient.previousDiseases}

</p>

<p>

Allergies :

{patient.allergies}

</p>

</div>

<div className="summary-card">

<h2>

📄 Uploaded Reports

</h2>

<ul>

{patient.previousReports.map((report,index)=>(

<li key={index}>

📄 {report}

</li>

))}

</ul>

</div>

</div>

</div>

)}



        </div>

    );

};

export default BedBooking;