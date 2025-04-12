const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there are some blogs saved initialy', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    const savedUser = await user.save()
    const result = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })

    token = result.body.token

    const blogsWithUser = helper.initialBlogs.map((b) => {
      return { ...b, user: savedUser._id }
    })

    await Blog.deleteMany({})
    await Blog.insertMany(blogsWithUser)
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

      assert.deepStrictEqual(resultBlog.body.title, blogToView.title)
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
        .set('Authorization', `Bearer ${token}`)
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
      assert(
        blogObjects.find(
          (blog) => JSON.stringify(blog) === JSON.stringify(newBlogObject)
        )
      )
    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
      const newBlogObject = {
        title: 'TestTitle',
        author: 'TestAuthor',
        url: 'TestUrl',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const blogToFind = response.body.find(
        (blog) => blog.title === newBlogObject.title
      )

      assert(blogToFind.likes === 0)
    })

    test('if the title is missing from the request responds with status 400', async () => {
      const newBlogObject = {
        author: 'TestAuthor',
        url: 'TestUrl',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogObject)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('if the author is missing from the request responds with status 400', async () => {
      const newBlogObject = {
        title: 'TestTitle',
        url: 'TestUrl',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogObject)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('if the token is missing from the request responds with status 401', async () => {
      const newBlogObject = {
        title: 'TestTitle',
        author: 'TestAuhtor',
        url: 'TestUrl',
      }

      await api.post('/api/blogs').send(newBlogObject).expect(401)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((b) => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api
        .delete(`/api/blogs/${validNonExistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status 400 if id is invalid', async () => {
      const invalidId = '000'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('if the token is missing from the request responds with status 401', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('updating likes of a blog', () => {
    test('succeeds with status 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: blogToUpdate.likes + 1 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert(updatedBlog.body.likes, blogToUpdate.likes + 1)
    })

    test('fails with status 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api
        .put(`/api/blogs/${validNonExistingId}`)
        .send({ likes: 0 })
        .expect(404)
    })

    test('fails with status 400 if id is invalid', async () => {
      const invalidId = '000'

      await api.put(`/api/blogs/${invalidId}`).send({ likes: 10 }).expect(400)
    })
  })
})

describe('when there is initialy one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aiden34',
      password: 'seentoomany',
      name: 'Aiden Pierce',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'secret',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode if username is not provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'secret',
      name: 'Superuser',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode if username is below minimum length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ai',
      password: 'secret',
      name: 'Superuser',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode if password is not provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aiden34',
      name: 'Superuser',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode if password is below minimum length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aiden34',
      password: 'se',
      name: 'Superuser',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
