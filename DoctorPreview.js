import { useState } from "react";
import "./DoctorPreview.css";

const DoctorPreview = ({ doctor, onClose }) => {

    const [message, setMessage] = useState("");

    const sendMessage = () => {

        if (message.trim() === "") {

            alert("Please type a message.");

            return;

        }

        alert("Message sent successfully!");

        setMessage("");

    };

    return (

        <div className="preview-overlay">

            <div className="preview-card">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>

                <div className="doctor-photo">

                    👨‍⚕️

                </div>

                <h2>{doctor.name}</h2>

                <p><strong>🩺 Specialization:</strong> {doctor.specialization}</p>

                <p><strong>🏥 Hospital:</strong> {doctor.hospital}</p>

                <p><strong>⭐ Rating:</strong> {doctor.rating}</p>

                <p><strong>💼 Experience:</strong> {doctor.experience} Years</p>

                <p><strong>📞 Phone:</strong> {doctor.phone}</p>

                <p><strong>💰 Fee:</strong> ₹{doctor.fee}</p>

                <p>

                    <strong>Status:</strong>

                    {doctor.available ? " 🟢 Available" : " 🔴 Busy"}

                </p>

                <hr />

                <h3>💬 Send Message</h3>

                <textarea

                    placeholder="Type your message..."

                    value={message}

                    onChange={(e) => setMessage(e.target.value)}

                />

                <button
                    className="message-btn"
                    onClick={sendMessage}
                >
                    Send Message
                </button>

                <div className="action-buttons">

                    <button

                        onClick={() =>
                            window.open(`tel:${doctor.phone}`)
                        }

                    >
                        📞 Voice Call
                    </button>

                    <button

                        onClick={() =>
                            alert("Starting Video Consultation...")
                        }

                    >
                        🎥 Video Call
                    </button>

                    <button

                        onClick={() =>
                            alert("Appointment Booked Successfully!")
                        }

                    >
                        📅 Book
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DoctorPreview;