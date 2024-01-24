import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import aviImg from '../img/avi.jpg'
import { useAuth } from '../context/authContext';
import CommentCard from './CommentCard';
import { toast } from 'react-toastify';



function BlogPage() {
    const [post, setPost] = useState()
    const [comments, setComments] = useState();
    const [postpage, setPostpage] = useState();
    const [comment, setComment] = useState();
    const { setLoading } = useAuth();
    const { id } = useParams()
    const history = useNavigate();



    const fetchComments = () => {
        setLoading(true)
        fetch('api/v1/blog/comments/' + id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((val) => {
            return val.json()
        }).then((val) => {
            console.log(val.comments)
            setComments(val.comments)
            setLoading(false)
        })
    }

    const feachUser = () => {
        setLoading(true)
        fetch('api/v1/blog/get-blog/' + id,
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
            setPostpage(val.blog)
            setLoading(false)

        })







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

    useEffect(() => {
        fetchComments()
    }, [])

    const commentChage = (e) => {
        setComment(e.target.value);
    }
    const commentSend = () => {
        setLoading(true)
        if (!comment) {
        setLoading(false)
            return toast('Plese Fill Comment !')
        }
        fetch('api/v1/blog/comment/' + id,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comment
                })
            }
        ).then((val) => {
            return val.json()
        }).then((val) => {
            console.log(val)
            setLoading(false)
            if (val.success === false) {
        setLoading(false)

                return toast('Plese Login !')
            }
            fetchComments()
        })
        setComment("")
        setLoading(false)

    }

    return (
        <>








            <main className="divide-page">

                <div className="post-page">
                    {postpage ? <>
                        <div className="img-div">
                            <img src={postpage.img} alt="" />
                        </div>
                        <div className="info">
                            <h1>{postpage.title}</h1>
                            <p>{postpage.user.name} | {postpage.createdAt.slice(0, 10)} | {postpage.createdAt.slice(11, 16)}</p>
                            <p className="views">0 Views</p>
                        </div>
                        <div className="post-data">

                            <div dangerouslySetInnerHTML={{ __html: postpage.content }} />

                        </div>
                        <h1 style={{ textAlign: "center", marginTop: 30 }}>Comments</h1>
                        <div className="post-comment">
                            <div className="comment-input">
                                <input type="text" placeholder="Comment" value={comment} onChange={commentChage} />
                                <div className="btn" onClick={commentSend}>Comment</div>
                            </div>
                            <div className="comment-grid">

                                {comments && comments.length !== 0 ?

                                    comments.map((val) => {

                                        return <>
                                            <CommentCard name={val.user.name} comment={val.comment} time={val.createdAt} />
                                        </>
                                    })


                                    : <>No Comments</>}




                            </div>
                        </div>
                    </> : []}
                </div>


                <div className="rigth-bar">
                    <div className="card-grid">
                        {post ? <>
                            {post.slice(0, 4).map((val, index) => {
                                return (<>
                                    <div className="card" onClick={() => history('/' + val._id)}>
                                        <img src={val.img} alt="" />
                                        <div className="info">
                                            <div className="time">
                                                {val.createdAt.slice(0, 10)}
                                            </div>
                                            <h2>{val.title}</h2>
                                            <br />
                                            <p>
                                                {val.description}
                                            </p>
                                        </div>
                                    </div>
                                </>)
                            })}

                        </> : []}

                    </div>
                </div>


            </main>















        </>












    )
}

export default BlogPage