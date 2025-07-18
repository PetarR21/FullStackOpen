import { FlatList } from 'react-native'
import useME from '../hooks/useMe'
import { ReviewItem, ItemSeparator } from './RepositoryItem'

const MyReviews = () => {
  const { me, refetch } = useME()

  if (!me) {
    return null
  }

  const reviews = me.reviews.edges.map((edge) => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} isInMyReviews={true} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews
