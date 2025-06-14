import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
  },
})

const AppBar = () => {
  const { loading, error, data } = useQuery(ME)

  if (loading) {
    return null
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex} horizontal>
        <AppBarTab text={'Repositories'} to='/' />

        {data && data.me ? (
          <AppBarTab text={'Sign Out'} to='/signin' />
        ) : (
          <AppBarTab text={'Sing In'} to='/signin' />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
