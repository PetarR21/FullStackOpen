import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import theme from '../theme'
import SignIn from './SignIn'
import RepositoryItem from './RepositoryItem'
import ReviewForm from './ReviewForm'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.grey,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:id' element={<RepositoryItem item={null} />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/createReview' element={<ReviewForm />} />
        <Route path='/myReviews' element={<MyReviews />} />
      </Routes>
    </View>
  )
}

export default Main
