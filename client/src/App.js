import React from "react"
import {Route,Routes} from "react-router-dom"
import Home from "./componets/Home"
import Signin from "./componets/Signin"
import Signup from "./componets/Signup"
import NavBar from "./componets/NavBar"
import Myblogs from "./componets/Myblogs"
import Editor from "./componets/Editor"
import EditBlog from "./componets/EditBlog"
import BlogPage from "./componets/BlogPage"
import { AuthProvider } from './context/authContext';
import Footer from "./componets/Footer"



function App() {

  return (
    <AuthProvider>
    <NavBar/>
    

    <Routes>
      <Route element={<Home/> } path="/"> </Route>
      <Route element={<BlogPage/> } path="/:id"> </Route>
      <Route element={<Signup/> } path="/signup"> </Route>
      <Route element={<Signin/> } path="/signin"> </Route>
      <Route element={<Myblogs/> } path="/myblogs"> </Route>
      <Route element={<EditBlog/> } path="/editor/:id"> </Route>
      <Route element={<Editor/> } path="/editor"> </Route>
    </Routes>
    <Footer/>

    </AuthProvider>
  )
}

export default App;
