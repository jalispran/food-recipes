import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import InfoContainer from '../components/InfoContainer';

export default function RecipeScreen(props) {
  let {route, navigation} = props
  let {recipeItem} = route.params;
  let {
    TranslatedInstructions, 
    TranslatedIngredients, 
    Diet, 
    TotalTimeInMins,
    Servings
  } = recipeItem

  useEffect(() => {
    navigation.setOptions({ title: recipeItem.TranslatedRecipeName.split('-')[0].split('(')[0] })
  }, [])

    return (
      <View style={styles.container}>
        <IngredientsContainer TranslatedIngredients={TranslatedIngredients} />
        <InfoContainer TotalTimeInMins={TotalTimeInMins} Servings={Servings} Diet={Diet} />
        <View style={{paddingTop: 10}}>
          <Text>{TranslatedInstructions}</Text>
        </View>
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
    }
  })