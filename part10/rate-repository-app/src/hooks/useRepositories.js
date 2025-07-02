import { GET_REPOSITORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepositories = (selectedValue, searchQuery, first) => {
  let variables = {}

  variables = { ...variables, first }

  if (selectedValue === 'latest') {
    variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
  } else if (selectedValue === 'highest') {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
  } else if (selectedValue === 'lowest') {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
  }

  if (searchQuery) {
    variables = {
      ...variables,
      searchKeyword: searchQuery,
    }
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepositories
