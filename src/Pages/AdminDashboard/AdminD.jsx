import React from "react";
import { useState,useEffect,useRef} from "react";
import './AdminD.css'
import axios from "axios";
function AdminD() {
    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const[price,setPrice] = useState("");
    const[courses,setCourses] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const inputRef = useRef(null);


    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/courses/add",{
            title : title,
            description : description,
            price : price,
            instructorId : user.id
        })
        } catch (error) {
            console.error("Error adding course:", error);
            return;
        }

        alert("Course added successfully!");
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/courses/getAll/${user.id}`);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    },[]);

    return (
        <div>
            <h2 className="title">Welcome {user.name}</h2>
            <h3 className="subtitle">This is the Admin DashBoard</h3>
            <h4 className="description">Please Add the courses you want to Offer</h4>

            <div>
                <form onSubmit={handleSubmit} className="form">
                    <input ref={inputRef} type="text" placeholder="Course title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Course description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" placeholder="Course price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <button type="submit">Add Course</button>
                </form>
            </div>

            <div>
                <h3 className="subtitle">Existing Courses</h3>
                <ul className="courses">
                    {courses.map((course) => (
                        <li key={course.id} className="Individual">{course.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminD;