import useRepositories from '../hooks/useRepositories'
import { FlatList, View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker'
import RepositoryItem from './RepositoryItem'
import { useNavigate } from 'react-router-native'
import { useState, useRef } from 'react'
import theme from '../theme'
import SearchbarComponent from './SearchbarComponent'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  navigateTo,
  selectedValue,
  setSelectedValue,
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const pickerRef = useRef()

  function open() {
    pickerRef.current.focus()
  }

  function close() {
    pickerRef.current.blur()
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item, index) =>
            item?.id ? String(item.id) : String(index)
          }
          renderItem={({ item }) => (
            <Pressable
              style={{ cursor: 'pointer' }}
              onPress={() => {
                navigateTo(item.id)
              }}
            >
              <RepositoryItem item={item} />
            </Pressable>
          )}
          ListHeaderComponent={
            <>
              <SearchbarComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <Picker
                style={{ color: theme.colors.textPrimary }}
                ref={pickerRef}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item
                  label='Select an item...'
                  value=''
                  enabled={false}
                  style={{ color: theme.colors.textSecondary }}
                />
                <Picker.Item label='Latest repositories' value='latest' />
                <Picker.Item
                  label='Highest rated repositories'
                  value='highest'
                />
                <Picker.Item label='Lowest rated repositories' value='lowest' />
              </Picker>
            </>
          }
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const { repositories, fetchMore } = useRepositories(
    selectedValue,
    debouncedSearchQuery,
    4
  )

  const navigate = useNavigate()

  const navigateTo = (id) => {
    navigate(`/${id}`)
  }

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigateTo={navigateTo}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
