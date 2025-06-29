import { Pressable, StyleSheet, View, Text } from 'react-native'

import theme from '../theme'
import RepositoryItemMain from './RepositoryItemMain'
import RepositoryStats from './RepositoryStats'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'

import * as Linking from 'expo-linking'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.primary,
    cursor: 'pointer',
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
})

const RepositoryItem = ({ item }) => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  if (!item) {
    if (!repository) {
      return null // or a loading spinner
    }

    return (
      <View testID='repositoryItem' style={styles.container}>
        <RepositoryItemMain item={repository} />
        <RepositoryStats item={repository} />
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.buttonText}>Open in Github</Text>
        </Pressable>
      </View>
    )
  } else {
    return (
      <View testID='repositoryItem' style={styles.container}>
        <RepositoryItemMain item={item} />
        <RepositoryStats item={item} />
      </View>
    )
  }
}

export default RepositoryItem
