import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'

const appoloUri = Constants.expoConfig.extra.uri

const httpLink = createHttpLink({
  uri: appoloUri,
})

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      }
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.log(error)
      return {
        headers,
      }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
