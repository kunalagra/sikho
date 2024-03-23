import React from "react";
import "../Instructor/becomeInstructor.css";

function Instructor() {
  return (
    <div className="becomeInstructorDiv">
      <div className="backgroundColorDiv"></div>
      <img
        src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
        // src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
        alt="instructorImg"
        className="instructorImg"
      ></img>
      <div className="contentDiv">
        <h2 className="heading">Become an instructor</h2>
        <p className="about">
          Top instructors from around the world teach thousands of students on
          Our Platform. We provide the tools and skills to teach what you love.{" "}
        </p>
        <div className="startTeching button">Start teaching today</div>
      </div>
    </div>
  );
}

export default Instructor;