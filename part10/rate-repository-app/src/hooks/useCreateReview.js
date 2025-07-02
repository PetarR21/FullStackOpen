import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { GET_REPOSITORY } from '../graphql/queries'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    refetchQueries: [GET_REPOSITORY],
  })

  const createReview = async (review) => {
    const res = await mutate({
      variables: {
        review,
      },
    })

    return res
  }

  return [createReview, result]
}

export default useCreateReview
