import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import Text from './Text'
import { useFormik } from 'formik'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
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
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const initialValues = {
  username: '',
  password: '',
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
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white' fontWeight='bold' textAlign='center'>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
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
