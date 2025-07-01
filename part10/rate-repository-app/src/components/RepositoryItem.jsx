import {
  Pressable,
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native'

import theme from '../theme'
import RepositoryItemMain from './RepositoryItemMain'
import RepositoryStats from './RepositoryStats'
import { useNavigate, useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'

import { format } from 'date-fns'

import * as Linking from 'expo-linking'
import useDeleteReview from '../hooks/useDeleteReview'

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
  reviewButton: {
    paddingInline: 30,
  },
  deleteButton: {
    backgroundColor: theme.colors.red,
  },
})

export const ItemSeparator = () => <View style={styles.separator} />

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

export const ReviewItem = ({ review, isInMyReviews }) => {
  const navigate = useNavigate()
  const [deleteForReview] = useDeleteReview()

  const viewRepository = () => {
    navigate(`/${review.repository.id}`)
  }

  const deleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            try {
              await deleteForReview(review.id)
              navigate(`/${review.repository.id}`)
            } catch (error) {
              console.log(error)
            }
          },
        },
      ]
    )
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.flex}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.reviewUsername}>
            {isInMyReviews ? review.repository.fullName : review.user.username}
          </Text>
          <Text style={styles.reviewDate}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      {isInMyReviews && (
        <View
          style={[
            styles.flex,
            { justifyContent: 'space-between', marginTop: 10, gap: 0 },
          ]}
        >
          <Pressable
            onPress={viewRepository}
            style={[styles.button, styles.reviewButton]}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <View>
            <Pressable
              onPress={deleteReview}
              style={[styles.button, styles.reviewButton, styles.deleteButton]}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      )}
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
