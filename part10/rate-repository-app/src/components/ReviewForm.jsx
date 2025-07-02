import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-native'
import Text from './Text'
import theme from '../theme'
import useCreateReview from '../hooks/useCreateReview'

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
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup.string(),
})

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: '',
}

export const ReviewFormContainer = ({ formik }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              formik.touched.owner && formik.errors.owner
                ? theme.colors.red
                : theme.colors.secondary,
          },
        ]}
        placeholder='Repository owner name'
        value={formik.values.owner}
        onChangeText={formik.handleChange('owner')}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={{ color: theme.colors.red }}>{formik.errors.owner}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              formik.touched.name && formik.errors.name
                ? theme.colors.red
                : theme.colors.secondary,
          },
        ]}
        placeholder='Repository name'
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={{ color: theme.colors.red }}>{formik.errors.name}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              formik.touched.rating && formik.errors.rating
                ? theme.colors.red
                : theme.colors.secondary,
          },
        ]}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        keyboardType='numeric'
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.red }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              formik.touched.review && formik.errors.review
                ? theme.colors.red
                : theme.colors.secondary,
          },
        ]}
        placeholder='Review'
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        multiline
        numberOfLines={4}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: theme.colors.red }}>{formik.errors.review}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white' fontWeight='bold' textAlign='center'>
          Create a review
        </Text>
      </Pressable>
    </View>
  )
}

const ReviewForm = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const res = await createReview({
        ownerName: values.owner,
        rating: Number(values.rating),
        repositoryName: values.name,
        text: values.review,
      })
      navigate(`/${res.data.createReview.repositoryId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return <ReviewFormContainer formik={formik} />
}

export default ReviewForm
