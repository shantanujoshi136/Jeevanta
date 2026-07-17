import { useEffect, useState } from "react";
import "./Ambulance.css";
import useNearbyHospitals from "../hooks/useNearbyHospitals";
import HospitalSelector from "../components/HospitalSelector";
import AmbulanceTracker from "../components/AmbulanceTracker";

const Ambulance = () => {

    const [location, setLocation] = useState({
        lat: null,
        lng: null
    });

    const [showSelector, setShowSelector] = useState(false);

    const [selectedHospital, setSelectedHospital] = useState(null);

    const [ambulanceStarted, setAmbulanceStarted] = useState(false);

    
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

            },

            (err) => {

                console.log(err);

                alert("Please allow location access.");

            }

        );

    }, []);

    const {

        hospitals,

        loading,

        error

    } = useNearbyHospitals(

        location.lat,

        location.lng

    );

    const handleOneTap = () => {

        if (!location.lat || !location.lng) {

            alert("Fetching your location...");

            return;

        }

        if (hospitals.length === 0) {

            alert("No nearby hospitals found.");

            return;

        }

        setShowSelector(true);

    };

    const handleHospitalSelect = (hospital) => {

        setSelectedHospital(hospital);

        setShowSelector(false);

        alert(
            `${hospital.name} selected.\n\nChecking bed availability...`
        );

        // Fake delay to simulate backend
        setTimeout(() => {

            alert("Bed Reserved Successfully!");

            setTimeout(() => {

                alert("Ambulance Dispatched!");

                setAmbulanceStarted(true);

            }, 1000);

        }, 1500);

    };

    return (

        <div className="ambulance-page">

            <div className="hero">

                <h1>🚑 One Tap Ambulance</h1>

                <p>

                    Press the button below.

                    We'll automatically locate nearby hospitals,

                    reserve a bed,

                    and dispatch an ambulance.

                </p>

                {!ambulanceStarted && (

                    <button
                        className="tap-btn"
                        onClick={handleOneTap}
                    >

                        Request Ambulance

                    </button>

                )}

            </div>

            {loading && (

                <h2 style={{ textAlign: "center" }}>

                    Searching Nearby Hospitals...

                </h2>

            )}

            {error && (

                <h2 style={{ textAlign: "center", color: "red" }}>

                    {error}

                </h2>

            )}

            {

                showSelector && (

                    <HospitalSelector

                        hospitals={hospitals}

                        onClose={() => setShowSelector(false)}

                        onSelect={handleHospitalSelect}

                    />

                )

            }

            {

                selectedHospital && !ambulanceStarted && (

                    <div className="selected-card">

                        <h2>

                            Selected Hospital

                        </h2>

                        <h3>

                            {selectedHospital.name}

                        </h3>

                        <p>

                            📍 {selectedHospital.address}

                        </p>

                        <p>

                            🛏 Beds Available :

                            {selectedHospital.availableBeds}

                        </p>

                        <p>

                            Waiting for ambulance dispatch...

                        </p>

                    </div>

                )

            }

            {

                ambulanceStarted && (

                    <AmbulanceTracker

                        hospital={selectedHospital}

                        userLocation={location}

                    />

                )

            }

        </div>

    );

};

export default Ambulance;