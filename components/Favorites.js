import { useEffect, useState } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function Favorite({Srno}) {

  const [favs, setFavs] = useState([])

  useEffect(() => {
    getFavs()
  }, [])

  // TODO: We call getItem every time Favorite component is rendered
  // Which happens too many times HomeScreen FlatList
  async function getFavs() {
    try {
      let favorites = await AsyncStorage.getItem('favourite-recipes');
      favorites = JSON.parse(favorites)
      if (favorites) {
        setFavs(favorites)
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function addOrRemoveFromFavourites(Srno) {
    try {
      let favorites = await AsyncStorage.getItem('favourite-recipes');
      favorites = JSON.parse(favorites)
      if (favorites.includes(Srno)) {
        favorites = favorites.filter(s => Srno != s)
        await AsyncStorage.setItem('favourite-recipes', JSON.stringify(favorites));
      } else {
        await AsyncStorage.setItem('favourite-recipes', JSON.stringify(favorites ? [...new Set([...favorites, Srno])] : [Srno]));  
      }
      getFavs()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Pressable onPress={() => addOrRemoveFromFavourites(Srno)}>
      {favs?.includes(Srno) ? (
        <View style={styles.favorite}>
          <MaterialIcons name="favorite" size={25} color="black" />
        </View>
      ) : (
        <View style={styles.favorite}>
          <MaterialIcons name="favorite-border" size={25} color="black" />
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  favorite: {
    paddingLeft: 10,
  }
})