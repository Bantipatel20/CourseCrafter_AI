import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.msg || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input placeholder="Name" onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate("/login")} style={styles.link}>
        Already have an account? Login
      </p>
    </div>
  );
}

const styles = {
  container: { width: "300px", margin: "100px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  link: { color: "blue", cursor: "pointer" }
};
