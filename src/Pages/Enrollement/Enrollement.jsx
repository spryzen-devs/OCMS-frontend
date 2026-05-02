import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Enrollement.css';
function Enrollement() {
  const {id} = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const[course, setCourse] = useState({});
  const[instructor, setInstructor] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
        try{
            const res = await axios.get(`https://ocms-frontend-1vt9.vercel.app/courses/${id}`);
            setCourse(res.data);
        }catch(error){
            console.error("Error fetching course details:", error);
        }
    }
    fetchCourse();
  }, []);

  const handleEnroll = async (e) => {
    try{
        await axios.post("https://ocms-frontend-1vt9.vercel.app/enrollements/add",{
            studentId: userId,
            courseId: id
        })
    }catch(error){
        alert("Error enrolling in course:", error);
        return;
    }

    alert("Enrolled successfully!");
  }

  return (
    <div className="enrollementContainer">
      <h1 className="title">Course Details</h1>
      <div className="courseContainer">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <h3>{course.price}</h3>
        <button onClick={() => {handleEnroll()}}>Enroll</button>
      </div>
    </div>
  )
}

export default Enrollement;