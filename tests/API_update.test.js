const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

const normal = {
  title: 'asd',
  author: 'asd',
  url: 'asd',
  likes: 5
}

test('get 200', async () => {
  const start = await api.get('/api/blogs')
  await api
    .put(`/api/blogs/${start.body[0].id}`)
    .send(normal)
    .expect(200)
})

afterAll(() => {
    mongoose.connection.close()
  })