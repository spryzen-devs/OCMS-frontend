import React, { use } from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentA.css";
function StudentA(){
    const[courses, setCourses] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
        try{
            const response = await axios.get("http://localhost:8080/courses");
            setCourses(response.data);
        }catch(error){
            console.error("Error fetching courses:", error);
        }
    }
    fetchCourses();
    },[]);
    return(
        <div>
            <h1 className="title">Student Dashboard</h1>
            <h2 className="subtitle">Welcome, {user.name}!</h2>
            <h3 className="subtitle">Available Courses:</h3>
            <div className="Course-Container">
                {courses.map((course) => (
                    <div key={course.id} className="Course-Card">
                        <h4>{course.title}</h4>
                        <p>{course.description}</p>
                        <button onClick={() => {navigate(`/enrollement/${course.id}`)}}>Enroll</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentA;