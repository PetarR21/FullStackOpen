import { Link } from 'react-router-native'
import { StyleSheet, Pressable } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

const AppBarTab = ({ text, to }) => {
  return (
    <Pressable style={styles.container}>
      <Link to={to}>
        <Text color='white' fontWeight='bold' fontSize='subheading'>
          {text}
        </Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
