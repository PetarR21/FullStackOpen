import { View, Image, StyleSheet } from 'react-native'
import Text from './Text'
import theme from './theme'

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: 'flex-start',
    flex: 1,
  },
  containerRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 18,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.primary,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.primary,
    padding: 4,
  },
})

const RepositoryItemMain = ({ item }) => {
  return (
    <View style={styles.containerRow}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.container}>
        <Text fontWeight='bold' fontSize='subheading'>
          {item.fullName}
        </Text>
        <Text color='textSecondary'>{item.description}</Text>
        <Text color='white' style={styles.languageTag}>
          {item.language}
        </Text>
      </View>
    </View>
  )
}

export default RepositoryItemMain
