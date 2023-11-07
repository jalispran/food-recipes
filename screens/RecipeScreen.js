import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import Favorite from '../components/Favorites';
import InfoContainer from '../components/InfoContainer';
import DietIndicator from '../components/DietIndicator';

export default function RecipeScreen(props) {
  let { route, navigation } = props
  let { recipeItem, Srno } = route.params;
  let {
    TranslatedInstructions,
    TranslatedIngredients,
    Diet,
    PrepTimeInMins,
    CookTimeInMins,
    TotalTimeInMins,
    Servings
  } = recipeItem

  const [recipeProcess, setRecipeProcess] = useState([])

  useEffect(() => {
    const instructions = TranslatedInstructions.split('.')
    setRecipeProcess(instructions)
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: recipeItem.TranslatedRecipeName.split('-')[0].split('(')[0],
      headerRight: () => (
        <View style={styles.headerRight}>
          <DietIndicator Diet={Diet} />
          <Favorite Srno={Srno} />
        </View>)
    })
  }, [navigation])

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
            .slice(0, -1)
            .filter(step => !!step)
            .map((step, idx) => <Text key={idx} style={{ padding: 10 }}>{`${idx + 1} : ${step}`}</Text>)
        }
      </ScrollView>
    </View>
  )
}

const IngredientsContainer = ({ TranslatedIngredients }) => {
  const [showIngredients, setShowIngredients] = useState(false)
  return (
    <View style={{
      backgroundColor: '#ECECEC',
      borderRadius: 10,
      paddingLeft: 10,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable onPress={() => setShowIngredients(!showIngredients)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {showIngredients ?
            <MaterialCommunityIcons name="arrow-expand-up" size={15} color="black" />
            : <MaterialCommunityIcons name="arrow-expand-down" size={15} color="black" />
          }
          <Text style={{ padding: 10 }}>Ingredients</Text>
        </Pressable>

        <Pressable style={{ paddingRight: 10 }} onPress={() => {
          Clipboard.setStringAsync(TranslatedIngredients)
        }}>
          <MaterialCommunityIcons name="content-copy" size={20} color="black" />
        </Pressable>
      </View>
      {
        showIngredients ?
          <IngredientsCapsules TranslatedIngredients={TranslatedIngredients} />
          : null
      }
    </View>
  )
}

const IngredientsCapsules = ({ TranslatedIngredients }) => {
  return (
    <View style={styles.ingredientsContainer}>
      {
        TranslatedIngredients.split(',')
          .map((i, idx) =>
            <Capsule key={idx} name={i} />
          )
      }
    </View>
  )
}

const Capsule = ({ name }) => {
  return (
    <View style={{ padding: 5 }}>
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
})