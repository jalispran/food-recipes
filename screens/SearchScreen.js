import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';

import Item from '../components/Item';
import RECIPES_V2 from '../assets/Indian Food Recipe Dataset - IndianFoodDataset8.json'


export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([])

  function searchRecipes(searchTerm) {
    setSearchQuery(searchTerm)
    const searchResult = RECIPES_V2
    .filter(item => !!searchTerm)
    .filter(item => item.RecipeName.includes(searchTerm) || item.Ingredients.includes(searchTerm))
    setSearchResults(searchResult)
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => searchRecipes(query)}
        value={searchQuery}
      />
      <ScrollView>
        <View style={{paddingTop:10}}>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => <Item recipeItem={item} navigation={navigation} />}
              keyExtractor={item => item.Srno}
            />    
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  }
})