import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ScrollView, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';

import Item from '../components/Item';
import RECIPES_V2 from '../assets/Indian Food Recipe Dataset - IndianFoodDataset8.json'
import FilterComponent from '../components/FilterComponent';
import { isVeg, isNonVeg, isEggitarian } from '../components/DietIndicator';


export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([])

  const [vegetarianFilter, setVegetarianFilter] = useState(false)
  const [nonVegetarianFilter, setNonVegetarianFilter] = useState(false)
  const [eggetarianFilter, setEggetarianFilter] = useState(false)

  function searchRecipes(searchTerm) {
    setSearchQuery(searchTerm)
    const searchResult = RECIPES_V2
      .filter(item => !!searchTerm)
      .filter(item => vegetarianFilter ? isVeg(item.Diet) : true)
      .filter(item => nonVegetarianFilter ? isNonVeg(item.Diet) : true)
      .filter(item => eggetarianFilter ? isEggitarian(item.Diet) : true)
      .filter(item => item.TranslatedRecipeName.toLowerCase().includes(searchTerm?.toLowerCase()) || item.Ingredients.toLowerCase().includes(searchTerm?.toLowerCase()))
    setSearchResults(searchResult)
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => searchRecipes(query)}
        value={searchQuery}
      />

      <View style={styles.filterContainer}>
        <Pressable onPress={() => setVegetarianFilter(!vegetarianFilter) }>
          <FilterComponent filterName={'Vegetarian'} selected={vegetarianFilter}/>
        </Pressable>
        <Pressable onPress={() => setNonVegetarianFilter(!nonVegetarianFilter)}>
          <FilterComponent filterName={'Non Vegeterian'} selected={nonVegetarianFilter}/>
        </Pressable>
        <Pressable onPress={() => setEggetarianFilter(!eggetarianFilter)}>
          <FilterComponent filterName={'Eggetarian'} selected={eggetarianFilter}/>
        </Pressable>
      </View>
      
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
  }, 
  filterContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    paddingTop: 10
  }
})