import { GET_REPOSITORY } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepository = (id, first) => {
  if (!id) {
    return { repository: undefined }
  }

  let variables = { repositoryId: id, first }

  // eslint-disable-next-line no-unused-vars
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }
    console.log('fetching more')
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepository
