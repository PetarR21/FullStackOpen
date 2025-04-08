const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { forEach } = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns correct number of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map((b) => b.title)

  assert(titles.includes(helper.initialBlogs[0].title))
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach((blog) => {
    assert(blog.id)
  })
})

test('a valid blog can be added', async () => {
  const newBlogObject = {
    title: 'TestTitle',
    author: 'TestAuthor',
    likes: 0,
    url: 'TestUrl',
  }

  await api
    .post('/api/blogs')
    .send(newBlogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogObjects = response.body.map((blog) => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
    }
  })

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(blogObjects.find((blog) => JSON.stringify(blog) === JSON.stringify(newBlogObject)))
})

after(async () => {
  await mongoose.connection.close()
})
