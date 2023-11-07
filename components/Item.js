import { StyleSheet, Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DietIndicator from './DietIndicator';


export default function Item(props) {
  let { recipeItem, navigation } = props
  let { Srno, TranslatedRecipeName, TotalTimeInMins, Servings, Diet, Course } = recipeItem

  return (
    <Pressable onPress={() => navigation.navigate('Recipe', { recipeItem, Srno })}>
      <View key={Srno} style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.recipeName}>{TranslatedRecipeName}</Text>
          <View style={styles.subtitle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="timer" size={15} color="black" />
              <Text style={styles.subtitleText}>{`${TotalTimeInMins} mins`}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
              <MaterialIcons name="restaurant-menu" size={15} color="black" />
              <Text style={styles.subtitleText}>{Course}</Text>
            </View>
          </View>
        </View>
        <View>
          <DietIndicator Diet={Diet} size={7}/>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey'
  },
  serial: {
    paddingRight: 10
  },
  recipeName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  subtitle: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  subtitleText: {
    paddingLeft: 5,
    fontSize: 12
  }, 
})