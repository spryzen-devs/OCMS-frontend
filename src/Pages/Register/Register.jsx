import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
function Register() {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();
    const[role,setRole] = useState("STUDENT");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post("https://ocms-frontend-1vt9.vercel.app/users/register",{
                name : name,
                email : email,
                password : password,
                role : role
            });
        }catch(err){
            alert(err.response.data.message);
            return;
        }

        alert("Registration Successful");
        navigate("/login");
    }
    return (
        <div>
            <h1 className="title">Welcome to Online Course Management System</h1>
            <h2 className="subtitle">Please Register to continue</h2>

            <div className="form">
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />   
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="STUDENT">Student</option>
                        <option value="INSTRUCTOR">Instructor</option>
                    </select>
                    <button className="register-btn" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;