import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';

function Signup() {
  const [user, setUser] = useState({name:"",email:"",password:"",cpassword:""});
  const{setLoading} = useAuth();
  const history = useNavigate();
  const onChangeHandal = (e) =>{
    setUser({...user, [e.target.name]:e.target.value})
  }
  const formSubmitHandal = async (e) =>{
    setLoading(true)
    const {name, password, email, cpassword} = user
  
    if(!name || !password || !email || !cpassword ){
    setLoading(false)
      return toast("Plesee Fill all fields !")
    }
    if(password!==cpassword){
    setLoading(false)

      return toast("Password and C-Password Not match")
    }
    try{
    
      const res = await fetch('/api/v1/user/signup',{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, password, email, cpassword
        })
      })
      const data = await res.json();
      if(data.success===true){
       toast("Signup Successfull !")
       setLoading(false)

        history('/signin')
      }else{
      setLoading(false)

        toast("Email is already in use !")

      }
    }catch(e){
      console.log(e)
    }
    setLoading(false)
    setUser({name:"",email:"",password:"",cpassword:""})
  }

  return (
    <>

<main className="auth">
  <div className="auth-card">
    <h1 style={{ textAlign: "center" }}>SIGNIN</h1>
    <br />
    <div className="lable-name" >Name</div>
    <input minLength={3} max={20} value={user.name} name='name' onChange={onChangeHandal} type="text"  />
    <br />
    <div className="lable-name" >Email</div>
    <input value={user.email} name='email' onChange={onChangeHandal} type="email"  />
    <br />
    <div className="lable-name">Password</div>
    <input maxLength="15" type="password"  name='password' value={user.password} onChange={onChangeHandal} />
    <br />
    <div className="lable-name">Password</div>
    <input maxLength="15" type="password" name='cpassword' value={user.cpassword} onChange={onChangeHandal} />
    <br />
    <div onClick={formSubmitHandal} className="btn">SIGNIN</div>
    <br />
    
    <p  onClick={()=>history('/signin')} style={{ textAlign: "center" }}> I have an account! SignIn</p>
  </div>
</main>


     {/* <div className='body'> 
      <div className="outer-box">
      <h1>SIGNUP</h1>
      <br />
        <input type="text" placeholder='NAME' value={user.name} name='name' onChange={onChangeHandal} />
        <br />
        <input type="text" placeholder='EMAIL' value={user.email} name='email' onChange={onChangeHandal} />
        <br />
        <input type="text" placeholder='PASSWORD' value={user.password} name='password'   onChange={onChangeHandal} />
        <br />
        <input type="text" placeholder='CONFORM PASSWORD' value={user.cpassword} name ='cpassword' onChange={onChangeHandal} />
        <br />
        <div><input style={{backgroundColor:"rgb(166, 0, 255)",color:"white",fontWeight:"bold"}} type="button" value='SIGNUP' onClick={formSubmitHandal} /></div>
        <p>do you have a account ?</p>
        <p onClick={()=>history('/signin')}>signin</p>
      </div>
    </div> */}
    </>
  )
}

export default Signup