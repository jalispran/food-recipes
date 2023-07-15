import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from '../components/Item'

import RECIPES_V2 from '../assets/Indian Food Recipe Dataset - IndianFoodDataset8.json'

export default function FavouriteScreen({ navigation }) {

  const [favoriteRecipes, setFavoriteRecipes] = useState([])

  useEffect(() => {
    getFavs()
  }, [])

  async function getFavs() {
    try {
      let favorites = await AsyncStorage.getItem('favourite-recipes');
      favorites = JSON.parse(favorites)
      if (favorites) {
        let favoriteRecipes = RECIPES_V2.filter(item => favorites.includes(item.Srno))
        console.log({favoriteRecipes})
        setFavoriteRecipes(favoriteRecipes)
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (favoriteRecipes.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Your favourite receipeis will pop up here</Text>
      </View>
    )
  }

  return (
    <ScrollView  style={styles.container}>
      <View>
        <FlatList
          data={favoriteRecipes}
          renderItem={({ item }) => <Item recipeItem={item} navigation={navigation} />}
          keyExtractor={item => item.Srno}
        />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
  
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  }
})