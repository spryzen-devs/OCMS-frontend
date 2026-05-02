import React, { use } from "react";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
function Login() {
    const inputRef = useRef(null);
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[role,setRole] = useState("STUDENT");
    const[auth,setAuth] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    });
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://ocms-backend-576v.onrender.com/users/login",{
                email : email,
                password : password,
                role : role
            });
            localStorage.setItem("user",JSON.stringify(response.data));
        } catch (error) {
            alert("Error logging in:", error.message);
            return;
        }

        alert("Login Successful");
        handleAuth();
    }

    const handleAuth = async () => {
        const response = await axios.get(`https://ocms-backend-576v.onrender.com/users/email/${email}`);
        const role = response.data.role;
        if(role === "STUDENT"){
            navigate("/student");
        }else{
            navigate("/admin");
        }
    }
    return (
        <div>
            <h1 className="title">Welcome to Online Course Management System</h1>
            <h2 className="subtitle">Please Login to continue</h2>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <input ref={inputRef} type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value={"STUDENT"}>Student</option>
                        <option value={"INSTRUCTOR"}>Instructor</option>
                    </select>
                    <button className="login-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;