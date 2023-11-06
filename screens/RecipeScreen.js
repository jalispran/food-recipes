import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Favorite from '../components/Favorites';
import InfoContainer from '../components/InfoContainer';

export default function RecipeScreen(props) {
  let {route, navigation} = props
  let {recipeItem, Srno} = route.params;
  let {
    TranslatedInstructions, 
    TranslatedIngredients, 
    Diet, 
    PrepTimeInMins,
    CookTimeInMins,
    TotalTimeInMins,
    Servings
  } = recipeItem
  const nonVegIndicators = ['Non Vegeterian', 'High Protein Non Vegetarian' ]
  const vegIndicators = ['Vegetarian', 'High Protein Vegetarian', 'Vegan', 'No Onion No Garlic (Sattvic)']
  const eggitarian = ['Eggetarian']

  const [dietColor, setDietColor] = useState('white')
  const [recipeProcess, setRecipeProcess] = useState([])

  useEffect(() => {
    if(nonVegIndicators.includes(Diet)) {
      setDietColor('red')
    }
    if(vegIndicators.includes(Diet)) {
      setDietColor('green')
    } 
    if(eggitarian.includes(Diet)) {
      setDietColor('orange')
    }
  }, [dietColor])

  useEffect(() => {
    const instructions = TranslatedInstructions.split('.')
    setRecipeProcess(instructions)
  }, [])

  useEffect(() => {
    navigation.setOptions({ 
      title: recipeItem.TranslatedRecipeName.split('-')[0].split('(')[0],
      headerRight: () => (
        <View style={styles.headerRight}>
          <View style={{...styles.dietIndicator, 
            borderColor: dietColor,
            backgroundColor: dietColor,
          }}/>
          <Favorite Srno={Srno} />
        </View>)
     })
  }, [navigation, dietColor])

    return (
      <View style={styles.container}>
        <ScrollView>
          <IngredientsContainer TranslatedIngredients={TranslatedIngredients} />
          <InfoContainer 
            Servings={Servings} 
            Diet={Diet}
            PrepTimeInMins={PrepTimeInMins}
            CookTimeInMins={CookTimeInMins}
          />
          {
            recipeProcess
              .filter(step => !!step)
              .map((step, idx) => <Text style={{padding: 10}}>{`${idx+1} : ${step}`}</Text>)
          }
        </ScrollView>
      </View>
    )
  }

  const IngredientsContainer = ({TranslatedIngredients}) => {
    const [showIngredients, setShowIngredients] = useState(false)
    return (
      <View style={{
        backgroundColor: '#ECECEC',
        borderRadius: 10,
        paddingLeft: 10,
      }}>
        <Pressable onPress={() => setShowIngredients(!showIngredients)} 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
          { showIngredients ?
            <MaterialCommunityIcons name="arrow-expand-up" size={15} color="black" />
            : <MaterialCommunityIcons name="arrow-expand-down" size={15} color="black" />
          }
          <Text style={{padding: 10}}>Ingredients</Text>
        </Pressable>
        {
          showIngredients ? 
            <IngredientsCapsules TranslatedIngredients={TranslatedIngredients} /> 
          : null
        }
      </View>
    )
  }

  const IngredientsCapsules = ({TranslatedIngredients})  => {
    return (
      <View style={styles.ingredientsContainer}>
        {
          TranslatedIngredients.split(',')
          .map((i, idx) => 
              <Capsule key={idx} name={i}/>
          )
        }
        </View>
    )
  }

  const Capsule = ({name}) => {
    return (
      <View style={{padding: 5}}>
        <Text style={styles.capsule}>{name}</Text>
      </View>
    )
  }

  

  const styles = StyleSheet.create({
    container: {
      flex: '1',
      padding: 20,
      backgroundColor: 'white',
    },
    capsule: {
      padding: 5,
      backgroundColor: 'blue',
      fontSize: 12,
      color: 'white',
      borderRadius: 10
    }, 
    ingredientsContainer: {
      flexDirection: 'row', 
      flexWrap: 'wrap',
      paddingBottom: 10
    },
    headerRight: {
      paddingRight: 20,
      flexDirection: 'row',
      alignItems: 'center',
    }, 
    dietIndicator: {
      flex:1,
      borderWidth: 10,
      borderRadius: 10,
    }
  })