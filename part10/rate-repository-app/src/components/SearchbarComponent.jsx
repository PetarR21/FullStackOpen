import { Searchbar } from 'react-native-paper'
import theme from '../theme'

const SearchbarComponent = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder='Search'
      onChangeText={setSearchQuery}
      value={searchQuery}
      mode='view'
      style={{
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
      }}
      inputStyle={{
        color: theme.colors.textPrimary,
      }}
    />
  )
}

export default SearchbarComponent
