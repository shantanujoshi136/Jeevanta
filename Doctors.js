import "./Doctors.css";

import DoctorCard from "../components/DoctorCard";

import useDoctors from "../hooks/useDoctors";

const Doctors = () => {

    const {

        loading,

        filteredDoctors,

        specializations,

        search,
        setSearch,

        specialization,
        setSpecialization,

        availableOnly,
        setAvailableOnly

    } = useDoctors();

    return (

        <div className="doctors-page">

            <h1>
                👨‍⚕️ Find Doctors
            </h1>

            <div className="doctor-filters">

                <input

                    type="text"

                    placeholder="Search Doctor..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

                <select

                    value={specialization}

                    onChange={(e) =>
                        setSpecialization(e.target.value)
                    }

                >

                    {

                        specializations.map((item) => (

                            <option

                                key={item}

                                value={item}

                            >

                                {item}

                            </option>

                        ))

                    }

                </select>

                <label className="checkbox">

                    <input

                        type="checkbox"

                        checked={availableOnly}

                        onChange={() =>
                            setAvailableOnly(
                                !availableOnly
                            )
                        }

                    />

                    Available Only

                </label>

            </div>

            {

                loading && (

                    <h2 className="loading">

                        Loading Doctors...

                    </h2>

                )

            }

            {

                !loading &&
                filteredDoctors.length === 0 && (

                    <h2 className="loading">

                        No Doctors Found

                    </h2>

                )

            }

            <div className="doctor-grid">

                {

                    filteredDoctors.map((doctor) => (

                        <DoctorCard

                            key={doctor.id}

                            doctor={doctor}

                        />

                    ))

                }

            </div>

        </div>

    );

};

export default Doctors;