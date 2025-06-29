import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'

import { SignInContainer } from '../../components/SignIn'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()

      const mockFormik = {
        values: { username: '', password: '' },
        errors: {},
        touched: {},
        handleChange: jest.fn((field) => (value) => {
          mockFormik.values[field] = value
        }),
        handleSubmit: jest.fn(() => {
          onSubmit(mockFormik.values)
        }),
      }

      render(<SignInContainer formik={mockFormik} />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testpass')
      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => {
        expect(mockFormik.handleSubmit).toHaveBeenCalled()
        expect(onSubmit).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'testpass',
        })
      })
    })
  })
})
