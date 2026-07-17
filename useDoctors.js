import { useEffect, useMemo, useState } from "react";

const useDoctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("All");
    const [availableOnly, setAvailableOnly] = useState(false);

    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/doctors"
                );

                const data = await response.json();

                setDoctors(data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        fetchDoctors();

    }, []);

    const specializations = useMemo(() => {

        return [
            "All",
            ...new Set(
                doctors.map((doctor) => doctor.specialization)
            )
        ];

    }, [doctors]);

    const filteredDoctors = useMemo(() => {

        return doctors.filter((doctor) => {

            const matchesName =
                doctor.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesSpecialization =
                specialization === "All" ||
                doctor.specialization === specialization;

            const matchesAvailability =
                !availableOnly || doctor.available;

            return (
                matchesName &&
                matchesSpecialization &&
                matchesAvailability
            );

        });

    }, [
        doctors,
        search,
        specialization,
        availableOnly
    ]);

    return {

        loading,

        filteredDoctors,

        specializations,

        search,
        setSearch,

        specialization,
        setSpecialization,

        availableOnly,
        setAvailableOnly

    };

};

export default useDoctors;