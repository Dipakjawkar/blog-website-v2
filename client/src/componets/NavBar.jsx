import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import homeImg from '../img/home-icon.png'
import searchImg from '../img/search-icon.png'
import websiteImg from '../img/website-logo.png'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton } from '@mui/material';


function NavBar() {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const { loading, setLoading } = useAuth();
  const {user, setUser} = useState();

  const history = useNavigate();
  useEffect(() => {
    statusCheck(); // Check the login status when the component mounts
  }, []);

  const statusCheck = () => {
    fetch('api/v1/user/verify')
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.success);
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    fetch('/api/v1/user/signout')
      .then((response) => response.json())
      .then(() => {
        toast('Logout Successful !')
        setIsLoggedIn(false);
        history('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>

      <div className="nav-bar">
        <ToastContainer ></ToastContainer>
        <header>
          <div className="title">
            <img className="icon" src={websiteImg} alt="" />
            Blog Website
          </div>
          <div className="main-menu">
            <ul>
              <li> <Link style={{textDecoration:"none"}} to="/">HOME</Link></li>
              {isLoggedIn ? (
                <>
                <li>{user ? <>{user.name}</> : []}</li>
                  <li> <Link style={{textDecoration:"none"}} to="/myblogs">MY BLOGS</Link></li>
                  <li className='btn' onClick={logout}>LOGOUT</li>
                </>
              ) : (
                <>
                <h1></h1>
                
                  <li><Link style={{textDecoration:"none"}} className='btn' to="/signin">SIGNIN</Link></li>
                  <li><Link style={{textDecoration:"none"}} className='btn' to="/signup">SIGNUP</Link></li>
                </>
              )}
            </ul>
          </div>
          {/* <img class="icon-img" src="./img/menu.png" alt="menu icon"> */}
          
        </header>
        {/* <div className="page-menu">
          <IconButton>
            <img className="icon" src={homeImg} alt="home icon" />
          </IconButton>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React JS</li>
            <li>Java</li>
          </ul>
          <IconButton>
            <img className="icon" src={searchImg} alt="Search Icon" />
          </IconButton>
        </div> */}

{loading && <Box sx={{ width: '100%' }}>
            <LinearProgress sx={{ color: '#7e22ce' }} />
          </Box>
          }

      </div>



      {/* <div className="navbar">
      <div className="blog-name">Blog Website</div>
      <div className="menu">
        <ul>
          <Link to="/">HOME</Link>
          {isLoggedIn ? (
            <>
              <Link to="/myblogs">MY BLOGS</Link>
              <li onClick={logout}>LOGOUT</li>
            </>
          ) : (
            <>
              <Link to="/signin">SIGNIN</Link>
              <Link to="/signup">SIGNUP</Link>
            </>
          )}
        </ul>
      </div>
    </div> */}
    </>
  );
}

export default NavBar;
