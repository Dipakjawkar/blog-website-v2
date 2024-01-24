import React from 'react'

function CommentCard({ comment, name, time }) {
  return (
    <>
      <div className="comment-card">
        <div className="img"><img width="50" height="50" src="https://img.icons8.com/fluency/96/000000/user-male-circle--v1.png" alt="user-male-circle--v1" /></div>
        <div className="info">
          <div className="title">{name.toUpperCase()}</div>
          <div className="comment">{comment}</div>
          <div style={{display:"flex", fontSize:"10px" ,justifyContent:"flex-end"}}>
            { time ?<>{time.slice(0,10)} - {time.slice(11,16)}</>  : "Not define"}
            {/* // {time} */}

          </div>
        </div>
      </div>

    </>
  )
}

export default CommentCard