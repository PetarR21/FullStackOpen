import { GET_REPOSITORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepositories = (selectedValue, searchQuery) => {
  let variables = {}

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

  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  })

  return { repositories: data ? data.repositories : undefined }
}

export default useRepositories
