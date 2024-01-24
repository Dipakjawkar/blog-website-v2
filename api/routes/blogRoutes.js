const express = require('express');
const {getBlog,postBlog,updateBlog,deleteBlog ,getBlogByid,getMyBlogs, addComment, getComments} = require('../controller/blogController')
const {userMiddlwere} = require('../middleware/userMiddlewere')
const blogRoutes = express.Router()

blogRoutes.get('/',getBlog)
blogRoutes.put('/post',userMiddlwere,postBlog)
blogRoutes.get('/myblogs',userMiddlwere,getMyBlogs)
blogRoutes.patch('/update/:id',userMiddlwere,updateBlog)
blogRoutes.delete('/delete/:id',userMiddlwere,deleteBlog)
blogRoutes.patch('/comment/:id',userMiddlwere,addComment)
blogRoutes.get('/comments/:id',getComments)
blogRoutes.get('/get-blog/:id',getBlogByid)
module.exports = blogRoutes