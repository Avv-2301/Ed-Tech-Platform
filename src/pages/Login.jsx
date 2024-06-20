import React from 'react';
import Template from '../components/core/Auth/Template';
import loginImage from '../assets/Images/login.webp';

const Login = () => {
  return (
    <div>
        <Template
        title="Join the millions learning to code with StudyNotion for free"
        description="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={loginImage}
        formType="login"/>
    </div>
  )
}

export default Login