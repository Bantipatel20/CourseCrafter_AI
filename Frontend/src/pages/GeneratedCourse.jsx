import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function GeneratedCourse (){
    const [prompt,setPrompt] = useState("");
    const navigate = useNavigate();

    const generateCourse = async()=>{
        try{
            const token =localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/course",
                {prompt},
                {headers:{Authorization:token}}
            )

            navigate("/dashboard");
        }catch(err){
            console.log(err);
            alert("Course generated failed");
        }
    }

     return (
    <div style={{ width: "500px", margin: "80px auto" }}>
      <h2>Generate Course</h2>
      <textarea
        rows="5"
        placeholder="Enter course prompt..."
        onChange={e => setPrompt(e.target.value)}
        style={{ width: "100%" }}
      />
      <br /><br />
      <button onClick={generateCourse}>Generate</button>
    </div>
  );
}