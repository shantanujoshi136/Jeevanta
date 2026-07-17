import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./BedBooking.css";

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

                            <button className="book-btn">
                                Book Now
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default BedBooking;