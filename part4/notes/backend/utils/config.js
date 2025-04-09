require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI =
<<<<<<< HEAD
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
=======
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
>>>>>>> 7fb077a35bcafd3fcd3f185fdcd53db84bbb4fdd

module.exports = { PORT, MONGODB_URI }
