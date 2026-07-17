import { useState } from "react";
import "./Auth.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const user = {
            email,
            password
        };

        try {

            const response = await fetch(
                "http://localhost:5000/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            const json = await response.json();

            if (!response.ok) {
                alert(json.error);
                return;
            }

            alert("Login Successful!");

            console.log(json);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Login</h2>

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
                    Login
                </button>

            </form>

        </div>

    );

};

export default Login;