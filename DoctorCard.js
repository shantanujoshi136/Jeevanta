import { useState } from "react";
import "./DoctorCard.css";
import DoctorPreview from "./DoctorPreview";

const DoctorCard = ({ doctor }) => {

    const [showPreview, setShowPreview] = useState(false);

    return (
        <>
            <div className="doctor-card">

                <div className="doctor-avatar">
                    👨‍⚕️
                </div>

                <h2>{doctor.name}</h2>

                <p>
                    <strong>🩺 Specialist:</strong>{" "}
                    {doctor.specialization}
                </p>

                <p>
                    <strong>🏥 Hospital:</strong>{" "}
                    {doctor.hospital}
                </p>

                <p>
                    <strong>💼 Experience:</strong>{" "}
                    {doctor.experience} Years
                </p>

                <p>
                    <strong>⭐ Rating:</strong>{" "}
                    {doctor.rating}
                </p>

                <p>
                    <strong>📞 Phone:</strong>{" "}
                    {doctor.phone}
                </p>

                <p>
                    <strong>💰 Fee:</strong>{" "}
                    ₹{doctor.fee}
                </p>

                <p
                    className={
                        doctor.available
                            ? "available"
                            : "busy"
                    }
                >
                    {doctor.available
                        ? "🟢 Available"
                        : "🔴 Busy"}
                </p>

                <button
                    className="book-btn"
                    onClick={() => setShowPreview(true)}
                >
                    👨‍⚕️ View Profile
                </button>

            </div>

            {showPreview && (
                <DoctorPreview
                    doctor={doctor}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
};

export default DoctorCard;