import { StyleSheet, View } from 'react-native'

import theme from './theme'
import RepositoryItemMain from './RepositoryItemMain'
import RepositoryStats from './RepositoryStats'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.white,
  },
})

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemMain item={item} />
      <RepositoryStats item={item} />
    </View>
  )
}

export default RepositoryItem
