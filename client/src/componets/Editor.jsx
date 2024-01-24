import React from 'react'
import  { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';


function Editor() {

  const [blog, setBlog] = useState({ title: "", description: "", img: ""});
  const editor = useRef(null);
	const [content, setContent] = useState('');
  const history = useNavigate();
  const onChangeHandal = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }
  const formSubmitHandal = async (e) => {
    const { title, description, img} = blog

    if (!title || !description || !content) {

      toast("Please Fill all fields !")
    }

    try {
      const res = await fetch('/api/v1/blog/post', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title, description, img, content
        })
      })
      const data = await res.json();
      if (data.success === true) {

        toast("New blog added successfully !")


        history('/myblogs')
      } else {
        toast("Please Login !")
        history("/signin")
      }
    } catch (e) {
      console.log(e)
    }
    setBlog({ title: "", description: "", img: "" })
    setContent("")

  }


  

  return (
    <>
      <main className="auth">
        <div className="post-upload">
          <h1 style={{ textAlign: "center" }}>EDITOR</h1>
          <br />
          <br />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="img-div">
            <img style={{ width: "200px", borderRadius: "10px" }} src={blog.img} alt="" />
          </div>
          <div className="lable-name">Thumbnail URL</div>
          <input type="text" value={blog.img} name='img' onChange={onChangeHandal} />
          <br />
          <br />

          <div className="info">
            <h1>{blog.title}</h1>
          </div>
          <div className="lable-name" >Title</div>
          <input type="text" maxLength="75" value={blog.title} name='title' onChange={onChangeHandal} />
          <br />
          <br />
          <div className="lable-name">Description</div>
          <input type="text" maxLength="180" value={blog.description} name='description' onChange={onChangeHandal} />
          <br />
          <br />
          <div className="lable-name">Content</div>
          {/* <textarea className="post-content-input" type="text" value={blog.content} name='content' onChange={onChangeHandal} /> */}
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
          />
          <br />
          <br />
          <div className="btn" value='POST' onClick={formSubmitHandal}>POST</div>
          <br />
        </div>
      </main>
      <div className="flex">
        <div className="post-page">
          <div className="img-div">
            <img src={blog.img} alt="" />
          </div>
          <div className="info">
            <h1>{blog.title}</h1>
            {/* <p>By Dipak Jawkar | 13 jun 2023</p>
            <p className="views">1032 Views</p> */}
          </div>
          <div className="post-data">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Editor