import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex} horizontal>
        <AppBarTab text={'Repositories'} to='/' />
        <AppBarTab text={'Sing In'} to='/signin' />
      </ScrollView>
    </View>
  )
}

export default AppBar
