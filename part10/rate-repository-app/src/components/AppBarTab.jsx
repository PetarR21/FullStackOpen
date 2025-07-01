import { Link, useNavigate } from 'react-router-native'
import { StyleSheet, Pressable } from 'react-native'
import Text from './Text'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
  container: {
    paddingBlock: 30,
    paddingInline: 15,
  },
})

const AppBarTab = ({ text, to }) => {
  const navigate = useNavigate()
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const onClick = () => {
    if (text === 'Sign Out') {
      authStorage.removeAccessToken()
      apolloClient.resetStore()
    }
    navigate(to)
  }

  return (
    <Pressable onPress={onClick} style={styles.container}>
      <Text color='white' fontWeight='bold' fontSize='subheading'>
        {text}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
