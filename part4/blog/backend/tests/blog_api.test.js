const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there are some blogs saved initialy', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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

  describe('viewing specific blog', () => {
    test('succeeds with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with status 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api.get(`/api/blogs/${validNonExistingId}`).expect(404)
    })

    test('fails with status 400 if id is invalid', async () => {
      const invalidId = '000'

      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new blog', () => {
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

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
      const newBlogObject = {
        title: 'TestTitle',
        author: 'TestAuthor',
        url: 'TestUrl',
      }

      await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const blogToFind = response.body.find((blog) => blog.title === newBlogObject.title)

      assert(blogToFind.likes === 0)
    })

    test('if the title is missing from the request responds with status 400', async () => {
      const newBlogObject = {
        author: 'TestAuthor',
        url: 'TestUrl',
      }

      await api.post('/api/blogs').send(newBlogObject).expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('if the author is missing from the request responds with status 400', async () => {
      const newBlogObject = {
        title: 'TestTitle',
        url: 'TestUrl',
      }

      await api.post('/api/blogs').send(newBlogObject).expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
