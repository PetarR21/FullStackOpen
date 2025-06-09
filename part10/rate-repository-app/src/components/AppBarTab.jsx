import { StyleSheet, Pressable } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
  tabButton: {
    padding: 20,
  },
})

const AppBarTab = ({ text }) => {
  return (
    <Pressable
      style={styles.tabButton}
      onPress={() => {
        console.log(text)
      }}
    >
      <Text color='white' fontWeight='bold' fontSize='subheading'>
        {text}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
