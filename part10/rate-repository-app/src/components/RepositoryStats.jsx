import { StyleSheet, View } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    gap: 6,
  },
})

const RepositoryStats = ({ item }) => {
  const formatNumber = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k'
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text fontWeight='bold' textAlign='center'>
          {formatNumber(item.stargazersCount)}
        </Text>
        <Text textAlign='center'>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight='bold' textAlign='center'>
          {formatNumber(item.forksCount)}
        </Text>
        <Text textAlign='center'>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight='bold' textAlign='center'>
          {item.reviewCount}
        </Text>
        <Text textAlign='center'>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight='bold' textAlign='center'>
          {item.ratingAverage}
        </Text>
        <Text textAlign='center'>Rating</Text>
      </View>
    </View>
  )
}

export default RepositoryStats
