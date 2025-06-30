import { Pressable, StyleSheet, View, Text, FlatList } from 'react-native'

import theme from '../theme'
import RepositoryItemMain from './RepositoryItemMain'
import RepositoryStats from './RepositoryStats'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'

import { format } from 'date-fns'

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
  flex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  separator: {
    height: 10,
  },
  rating: {
    width: 40,
    height: 40,
    borderColor: theme.colors.primary,
    borderRadius: '50%',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  reviewUsername: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 2,
  },
  reviewDate: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => {
  return (
    <View
      testID='repositoryItem'
      style={[styles.container, { marginBottom: '10' }]}
    >
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
}

const ReviewItem = ({ review }) => {
  return (
    <View style={[styles.container, styles.flex]}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={{ flexShrink: 1 }}>
        <Text style={styles.reviewUsername}>{review.user.username}</Text>
        <Text style={styles.reviewDate}>
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  )
}

const RepositoryItem = ({ item }) => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  if (!item) {
    if (!repository) {
      return null // or a loading spinner
    }

    const reviews = repository.reviews.edges.map((edge) => edge.node)

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
      />
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
