import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteImg from '../img/delete.png'
import { useAuth } from '../context/authContext';
import postImg from '../img/posts.png'
import viewImg from '../img/views.png'
import editImg from '../img/edit.png'
import { toast } from 'react-toastify';



function Myblogs() {

  const [post, setPost] = useState();
  const { setLoading } = useAuth();

  const history = useNavigate();
  const feachUser = () => {
    setLoading(true)
    fetch('api/v1/blog/myblogs',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((val) => {
      return val.json()
    }).then((val) => {
      console.log(val)
      setPost(val.blogs)
      setLoading(false)
    })
  }
  const deleteBlog = (id) => {
    fetch('api/v1/blog/delete/' + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((val) => {
      return val.json()
    }).then((val) => {
      console.log(val)
      feachUser()
      toast("Blog deletion successful")
    })
  }

  useEffect(() => {
    feachUser()
  }, [])


  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = post ? post.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>



      <main>
        <div className="card-grid">
          <div className="admin-fetures">
            <div className="btn" onClick={() => history("/editor")}>ADD NEW POST</div>
          </div>
          {/* <div className="admin-fetures">
      <img src={viewImg} alt="" />
      <p>100 views</p>
    </div> */}
          <div className="admin-fetures">
            <img src={postImg} alt="" />
            <p>{post ? post.length : <>-</>}</p>
          </div>
        </div>
        <div className="table-dash">
          <table>
            <thead>
              <tr>
                <th>Post NO.</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {post && post.length!==0 ? <>

                {currentItems.map((val, index) => {
                  return (<>

                    <tr>
                      <td style={{ display: 'flex', justifyContent: "center", margin:"10px 0px"}}><img style={{ width: "400px", borderRadius: "10px" }} src={val.img} alt="" /></td>
                      <td onClick={() => history('/' + val._id)}>{val.title}</td>
                      <td>
                        <div className="btn-dash-table">
                          <br />
                          <div className="flex" onClick={() => deleteBlog(val._id)} >
                            <img src={deleteImg} /> Delete
                          </div>
                          <div className="flex" onClick={() => history('/editor/' + val._id)} >
                            <img src={editImg} alt="" /> Edit
                          </div>
                          <br />
                          <br />
                          <br />
                        </div>
                      </td>
                    </tr>


                  </>)
                })}

              </> : "No Blogs"}


            </tbody>
          </table>
        </div>
        {post ? <>
            <div className="pagination">
              {Array.from({ length: Math.ceil(post.length / itemsPerPage) }).map((_, index) => (
                <div key={index}>
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </div>
              ))}
            </div>
          </> : []}
      </main>





    </>
  )
}

export default Myblogs