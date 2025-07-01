import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import Text from './Text'
import { useFormik } from 'formik'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import useCreateUser from '../hooks/useCreateUser'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
    gap: 20,
  },
  textInput: {
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
  },
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be at most 50 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

export const SignInContainer = ({ formik }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              formik.touched.username && formik.errors.username
                ? theme.colors.red
                : theme.colors.secondary,
          },
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.red }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              formik.touched.password && formik.errors.password
                ? theme.colors.red
                : theme.colors.secondary,
          },
        ]}
        placeholder='Password'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.red }}>
          {formik.errors.password}
        </Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
                ? theme.colors.red
                : theme.colors.secondary,
          },
        ]}
        placeholder='Password confirmation'
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={{ color: theme.colors.red }}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white' fontWeight='bold' textAlign='center'>
          Sign up
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const [createUser] = useCreateUser()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const { data } = await createUser({
        username: values.username,
        password: values.password,
      })

      await signIn({
        username: values.username,
        password: values.password,
      })

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return <SignInContainer formik={formik} />
}

export default SignIn
