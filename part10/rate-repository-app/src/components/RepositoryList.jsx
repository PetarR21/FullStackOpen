import useRepositories from '../hooks/useRepositories'
import { FlatList, View, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { repositories } = useRepositories()

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item, index, separators }) => (
            <RepositoryItem item={item} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default RepositoryList
