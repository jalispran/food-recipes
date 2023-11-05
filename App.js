import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';
import SearchScreen from './screens/SearchScreen';
import FavouriteScreen from './screens/FavouriteScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Today's Featured" component={HomeScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  )
}

function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Favourites" component={FavouriteScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen 
            name="Featured" 
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarLabel: 'Featured',
              tabBarIcon: ({focused}) => (
              focused ? <MaterialIcons name="bookmark" size={25} color="black" />
              : <MaterialIcons name="bookmark-border" size={25} color="black" /> )
            }} 
          />
          <Tab.Screen 
            name="Favourites" 
            component={FavoriteStack} 
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
              focused ? <MaterialIcons name="favorite" size={25} color="red" />
              : <MaterialIcons name="favorite-border" size={25} color="black" />)
            }}
          />
          <Tab.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
              focused ? <Ionicons name="ios-search-sharp" size={25} color="black" />
              : <Ionicons name="ios-search-outline" size={25} color="black" />)
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  searchIcon: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
});
