import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload

      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog(state, action) {
      const id = action.payload

      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, removeBlog, addComment } =
  slice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.createComment(comment, id)
    dispatch(updateBlog(commentedBlog))
  }
}

export const updateBlogLikes = (updatedBlogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(updatedBlogObject)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default slice.reducer
