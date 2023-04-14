import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, FlatList} from 'react-native';

import RECIPES from '../assets/recipes.json'
import RECIPES_V2 from '../assets/Indian Food Recipe Dataset - IndianFoodDataset8.json'
import Item from '../components/Item'


export const HomeScreen = ({navigation}) => {
    return (
      <ScrollView>
        <View style={{
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
            alignItems: 'center',
        }}>
        <FlatList
          data={RECIPES_V2}
          renderItem={({item}) => <Item recipeItem={item} navigation={navigation}/>}
          keyExtractor={item => item.Srno}
        />
        <StatusBar style="auto" />
        </View>
      </ScrollView>
    )
  }