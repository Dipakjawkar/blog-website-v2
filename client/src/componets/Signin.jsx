import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
  const { setIsLoggedIn, setLoading } = useAuth();

  const [user, setUser] = useState({ email: "", password: "" });
  const history = useNavigate();
  const onChangeHandal = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const formSubmitHandal = async (e) => {
    setLoading(true)
    const { password, email } = user
    if (!password || !email) {
      setLoading(false)
      return toast("Plesee Fill all fields !");
    }
    try {
      const res = await fetch('/api/v1/user/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password, email
        })
      })
      const data = await res.json();
      if (data.success === true) {

        toast("Signin Successfull !");
        setLoading(false)

        console.log(data)
        setIsLoggedIn(true);
        history('/')
      } else {
        setLoading(false)
        toast("Invalid Email and password");

      }
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
    setLoading(false)
    setUser({ email: "", password: "" })

  }


  return (
    <>

      <main className="auth">

        <div className="auth-card">
          <h1 style={{ textAlign: "center" }}>SIGNIN</h1>
          <br />
          <div className="lable-name" >Email</div>
          <input value={user.email} name='email' onChange={onChangeHandal} type="email" />
          <br />
          <div className="lable-name">Password</div>
          <input type="password" name='password' value={user.password} onChange={onChangeHandal} />
          <br />
          <div onClick={formSubmitHandal} className="btn">SIGNIN</div>
          <br />
          <p onClick={() => history('/signup')} style={{ textAlign: "center" }}>Do you have an account? SignUp</p>
        </div>
      </main>


      {/* <div className='body'> 
      <div className="outer-box">
      <h1>SIGNIN</h1>
      <br />
        <input type="text" placeholder='USER NAME OR EMAIL ID' name='email' value={user.email} onChange={onChangeHandal}/>
        <br />
        <input type="text" placeholder='PASSWORD' name='password' value={user.password} onChange={onChangeHandal}/>
        <br />
        <div><input className='btn-fill'  type="button" value='SIGNIN' onClick={formSubmitHandal} /></div>
        <p>forgot your password ?</p>
        <p onClick={()=>history('/signup')}>signup</p>
      </div>
    </div> */}
    </>
  )
}

export default Signin