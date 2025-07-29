import React, { useState } from 'react'

const Login = () => {
    const[user,setuser]=useState({
        userName:"",
        cPassword:"",
        email:"",
        password:"",
        mobile:""
    });
    const handleInputChange=(e)=>{
        const{name,value}=e.target;
        setuser((prev)=> ({...prev,[name]:value}))
    };
  return (
    <>
    <div className='h-screen flex justify-center items-center'>
        <div className='h-[500px] w-[440px] flex-col justify-center items-center border border-black mt-24 rounded-2xl'>
            <h2>Sign Up</h2>
            <p>Please fill your details</p>
        <label htmlFor="UserName">
                <b>UserName</b>
                </label>
                <input className='h-[35px] w-[400px] border border-black' type="text" onChange={handleInputChange} name="userName" placeholder="Enter UserName" id="name_id"required value={user.userName}/>

                <label htmlFor="email">
                    <b>Email</b>
                </label>
                <input type="text" onChange={handleInputChange} name="email" placeholder="Enter Email" id="email_id" required value={user.email}/>

                <label htmlFor="mobile">
                    <b>Mobile No.</b>
                </label>
                <input type="text" name="mobile" id="mobile_id" onChange={handleInputChange} placeholder='Enter your mobile no' required value={user.mobile}/>
                
                <label htmlFor="Password">
                <b>Password</b>
                </label>
                <input type="password" onChange={handleInputChange} name="password" placeholder="Enter password" id="password_id"required value={user.password}/>
                
                <label htmlFor="confirm password">
                <b>Confirm Password</b>
                </label>

                <input type="password" onChange={handleInputChange} name="cPassword"  placeholder="Confirm Password" id="confirm_id"required value={user.cPassword}/>

        </div>
    </div>
    </> 
  )
}

export default Login;