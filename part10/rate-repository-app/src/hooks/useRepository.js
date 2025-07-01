import { GET_REPOSITORY } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepository = (id) => {
  if (!id) {
    return { repository: undefined }
  }

  // eslint-disable-next-line no-unused-vars
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
  })

  return { repository: data ? data.repository : undefined }
}

export default useRepository
