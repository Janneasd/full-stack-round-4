const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')




test('get 204 after delete', async () => {
  const person = await api.get('/api/users')
  const userForToken = {
    username: person.body[0].username,
    id: person.body[0].id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  const newBlog = helper.initialBlogs[0]
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

  const start = await api.get('/api/blogs')


  await api
    .delete(`/api/blogs/${start.body[0].id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

afterAll(() => {
    mongoose.connection.close()
  })