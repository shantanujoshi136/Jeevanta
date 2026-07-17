import { useEffect, useState } from "react";

const useNearbyHospitals = (latitude, longitude) => {

    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Calculate distance between two coordinates (in km)
    const getDistance = (lat1, lon1, lat2, lon2) => {

        const R = 6371;

        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    useEffect(() => {

        if (latitude === null || longitude === null) return;

        const fetchHospitals = async () => {

            try {

                const response = await fetch("http://localhost:5000/hospitals");
                const data = await response.json();

                const nearbyHospitals = data.filter((hospital) => {

                    const distance = getDistance(
                        latitude,
                        longitude,
                        hospital.latitude,
                        hospital.longitude
                    );

                    return (
                        hospital.bookingAllowed &&
                        distance <= 10
                    );
                });

                setHospitals(nearbyHospitals);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        };

        fetchHospitals();

    }, [latitude, longitude]);

    return {
        hospitals,
        loading,
        error
    };

};

export default useNearbyHospitals;