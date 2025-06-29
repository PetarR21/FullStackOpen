import useRepositories from '../hooks/useRepositories'
import { FlatList, View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

import RepositoryItem from './RepositoryItem'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, navigateTo }) => {
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
          keyExtractor={(item, index) =>
            item?.id ? String(item.id) : String(index)
          }
          renderItem={({ item }) => (
            <Pressable
              style={{ cursor: 'pointer' }}
              onPress={() => {
                navigateTo(item.id)
              }}
            >
              <RepositoryItem item={item} />
            </Pressable>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  const navigate = useNavigate()

  const navigateTo = (id) => {
    navigate(`/${id}`)
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigateTo={navigateTo}
    />
  )
}

export default RepositoryList
