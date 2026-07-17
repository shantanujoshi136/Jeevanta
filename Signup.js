import { useState } from "react";
import "./Auth.css";

const Signup = () => {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const newUser = {
            name,
            email,
            password
        };

        try {

            const response = await fetch(
                "http://localhost:5000/api/user/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                }
            );

            const json = await response.json();

            if (!response.ok) {

                alert(json.error);
                return;

            }

            alert("Signup Successful!");

            console.log(json);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Create Account</h2>

                <label>Name</label>

                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>

                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>

                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Sign Up
                </button>

            </form>

        </div>

    );

};

export default Signup;