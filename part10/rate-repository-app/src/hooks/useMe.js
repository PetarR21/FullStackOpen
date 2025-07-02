import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useME = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  })

  return { me: data ? data.me : undefined, refetch }
}

export default useME
