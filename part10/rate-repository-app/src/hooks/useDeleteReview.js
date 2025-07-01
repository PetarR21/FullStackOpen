import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: ['Repositories', 'Repository', 'Me'],
  })

  const deleteForReview = async (id) => {
    console.log(id)
    const res = await mutate({
      variables: {
        deleteReviewId: id,
      },
    })

    return res
  }

  return [deleteForReview, result]
}

export default useDeleteReview
