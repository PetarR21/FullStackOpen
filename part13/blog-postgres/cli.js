const { Blog, sequelize } = require('./Blog')

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await Blog.findAll()

    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
