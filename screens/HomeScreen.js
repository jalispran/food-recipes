import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import { MaterialIcons } from '@expo/vector-icons';

import RECIPES from '../assets/recipes.json'
import RECIPES_V2 from '../assets/Indian Food Recipe Dataset - IndianFoodDataset8.json'
import Item from '../components/Item'


export const HomeScreen = ({ navigation }) => {
  const focused = useIsFocused()
  const [featuredRecipes, setFeaturedRecipes] = useState([])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <MaterialIcons style={{
        flex: 1,
        padding: 20,
        alignItems: 'center',
      }} name="search" size={24} color="black" onPress={() => navigation.navigate('Search')} />
    })
  }, [])

  useEffect(() => {
    let i = Math.floor(new Date().getDate()/31 * RECIPES_V2.length - 10)
    let featured = RECIPES_V2
      .slice(i, i + 10)
    setFeaturedRecipes(featured)
  }, [focused])

  if (!featuredRecipes) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={featuredRecipes}
          renderItem={({ item }) => <Item recipeItem={item} navigation={navigation} />}
          keyExtractor={item => item.Srno}
        />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
})