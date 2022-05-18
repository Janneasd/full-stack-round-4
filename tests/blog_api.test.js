const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')




test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs are defined', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toBeDefined()
  })

  test('adding new blog works', async () => {

    const newBlog = {
        title: '3',
        author: '3',
        url: '3',
      
        _id: '35656876786879678'
      }

       await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

  

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
 
  })

  test('deleting blog works', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

      
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  })

  test('updating blog works', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

      
    await api
    .delete(`/api/blogs/${blogToUpdate.id}`)
    .expect(200)

  })
  
 test('password too short', async () => {
   const user = {
     name: 'janne',
     username: 'hölttä',
     password: 'as'
   }

   await api
   .post('/api/users')
   .send(user)
   .expect(400)
   .expect('Content-Type', /application\/json/)
 })
 
 test('username too short', async () => {
   const user = {
     name: 'janne',
     username: 'x',
     password: 'asdjkasdlkj'
   }
   await api
   .post('/api/users')
   .send(user)
   .expect(400)
   .expect('Content-Type', /application\/json/)
 })

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })
  

afterAll(() => {
  mongoose.connection.close()
})