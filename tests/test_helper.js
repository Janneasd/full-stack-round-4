const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'asd',
        author: 'asd',
        url: 'asd',
        likes: 5,
        _id: '628251d9d13a923ca85a8635'
    },
    {
        title: 'xcv',
        author: 'xcv',
        url: 'xcv',
        likes: 3,
        _id: '628251d9d13a923ca85a8637'
    },
  ]
  const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }