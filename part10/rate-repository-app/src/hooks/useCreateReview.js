import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    refetchQueries: ['Repositories', 'Repository'],
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
