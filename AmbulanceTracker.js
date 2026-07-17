import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./AmbulanceTracker.css";


const userIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const hospitalIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const ambulanceIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});

const AmbulanceTracker = ({ hospital, userLocation }) => {

    const [ambulancePosition, setAmbulancePosition] = useState({

        lat: hospital.latitude,
        lng: hospital.longitude

    });

const [distance, setDistance] = useState(0);

const [eta, setEta] = useState(0);

const [status, setStatus] = useState("🚑 Ambulance Dispatched");

const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =

        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *

        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *

        Math.sin(dLon / 2);

    const c =

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1 - a)

        );

    return R * c;

};

    useEffect(() => {

        const interval = setInterval(() => {

            setAmbulancePosition((prev) => {

                const speed = 0.04;

                const newLat =
                    prev.lat +
                    (userLocation.lat - prev.lat) * speed;

                const newLng =
                    prev.lng +
                    (userLocation.lng - prev.lng) * speed;

                const remainingDistance = calculateDistance(

    newLat,

    newLng,

    userLocation.lat,

    userLocation.lng

);

setDistance(remainingDistance);

setEta(

    Math.max(

        1,

        Math.ceil(remainingDistance * 2)

    )

);

if(remainingDistance < 0.1){

    setStatus("✅ Ambulance Arrived");

}
else if(remainingDistance < 1){

    setStatus("🚑 Ambulance Nearby");

}
else{

    setStatus("🚑 Ambulance On The Way");

}

                return {

                    lat: newLat,
                    lng: newLng

                };

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [userLocation]);

    return (

        <div className="tracker-container">

            <h2>

                🚑 Ambulance Live Tracking

            </h2>

<div className="tracker-info">

    <h2>

        {status}

    </h2>

    <p>

        <strong>

            Hospital :

        </strong>

        {hospital.name}

    </p>

    <p>

        <strong>

            ETA :

        </strong>

        {eta} Minutes

    </p>

    <p>

        <strong>

            Remaining Distance :

        </strong>

        {distance.toFixed(2)} km

    </p>

</div>

            <MapContainer

                center={[

                    userLocation.lat,

                    userLocation.lng

                ]}

                zoom={13}

                className="tracker-map"

            >

                <TileLayer

                    attribution="&copy; OpenStreetMap"

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />

<Polyline

    positions={[

        [

            hospital.latitude,

            hospital.longitude

        ],

        [

            userLocation.lat,

            userLocation.lng

        ]

    ]}

/>

                {/* User */}

                <Marker
    position={[userLocation.lat, userLocation.lng]}
    icon={userIcon}
>

                    <Popup>

    👤 Your Location

</Popup>
                </Marker>

                {/* Hospital */}

                <Marker

                    position={[

                        hospital.latitude,

                        hospital.longitude

                    ]}
                    icon={hospitalIcon}
                >

                    <Popup>

    🏥 {hospital.name}

</Popup>

                </Marker>

                {/* Ambulance */}

                <Marker

                    position={[

                        ambulancePosition.lat,

                        ambulancePosition.lng

                    ]}
                     icon={ambulanceIcon}
                >

                    <Popup>

                        🚑 Ambulance

                    </Popup>

                </Marker>

            </MapContainer>

        </div>

    );

};

export default AmbulanceTracker;