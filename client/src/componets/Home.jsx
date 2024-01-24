import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import aviImg from '../img/avi.jpg'
import { useAuth } from '../context/authContext';



function Home() {



  const [post, setPost] = useState();
  const history = useNavigate();
  const { setLoading } = useAuth();

  function timeAgo(mongooseTime) {
    const currentTime = new Date();
    const timeDifference = currentTime - mongooseTime;

    // Convert the time difference to minutes
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo === 1) {
      return '1 minute ago';
    } else {
      return `${minutesAgo} minutes ago`;
    }
  }

  // Example usage:
  const mongooseTime = new Date('2023-10-17T12:30:00');
  const timeAgoString = timeAgo(mongooseTime);
  console.log(timeAgoString);


  const feachUser = () => {
    setLoading(true)
    fetch('api/v1/blog',
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

  useEffect(() => {
    feachUser()
  }, [])

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = post ? post.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>

      <main>
        <div className="main-section">
          {post && post.length != 0 ?
            <>

              <div className="feature-card" onClick={() => history('/' + post[0]._id)}>
                <div className="detils">
                  <h1 className="tilte">
                    <div className="time">#Trending</div>
                    {post[0].title}
                  </h1>
                  <div className="description">
                    {post[0].description}
                  </div>
                  <span className="card-btn">Read More</span>
                </div>
                <img src={post[0].img ? post[0].img : "https://newsletter.kokilabenhospital.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg"} alt="post img" />
              </div>
            </> : <p style={{ textAlign: "center" }}>No post</p>}
          <br />
          <br />
          <br />
          <h1 style={{ textAlign: "center" }}>ALL POST</h1>
          <div className="card-grid" >



            {post && post.length != 0 ?
              <>

                {currentItems.map((val, index) => {
                  return (<>
                    <div   className="card" onClick={() => history('/' + val._id)} >
                      <img src={val.img ? val.img : "https://newsletter.kokilabenhospital.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg"} alt="post img" />
                      <div className="detils">
                        <div className="time">

                          {val.user.name} | {val.createdAt.slice(0, 10)} | {val.createdAt.slice(11, 16)}



                        </div>
                        <h1 className="card-tilte">
                          {val.title}
                        </h1>
                        <div className="description">
                          {val.description}
                        </div>
                        <span className="card-btn">Read More</span>
                      </div>
                    </div>

                  </>)
                })}

              </> : "Post not found"}
          </div >
          <br />
          {post ? <>
            <div className="pagination">
              {Array.from({ length: Math.ceil(post.length / itemsPerPage) }).map((_, index) => (
                <div key={index}>
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </div>
              ))}
            </div>
          </> : []}

          <br />
          <div>

          </div>
          <br />
          <h1 style={{ textAlign: "center" }}>REVIEW</h1>
          <div className="card-grid">
            <div className="r-card">
              <img className="r-img" src={aviImg} alt="" />
              <div className="info">
                <div className="c-linkedin">
                  <img src="./img/linkedin.png" alt="" />
                  @avinashAndhle
                </div>
                <h2 className="card-title">Avinash Andhale</h2>
                <div className="description">
                  <span style={{ color: "#7e22ce" }}> SDE 3 At Google </span> <br />
                  I recently used Blog Website and had an outstanding experience. The
                  platform's user-friendly interface made navigation a breeze. The
                  content was comprehensive, well-organized, and incredibly helpful.
                  The interactive features kept me engaged, and the self-paced
                  learning allowed me to tailor my study schedule. Moreover, the
                  timely support from the website's team was commendable. Overall, I
                  highly recommend Blog Website for anyone looking to enhance their
                  knowledge. 5/5 stars
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>





















    </>








  )
}

export default Home