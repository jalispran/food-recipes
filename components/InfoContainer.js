import * as React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const InfoContainer = ({TotalTimeInMins, Servings, Diet}) => {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <MaterialIcons name="timer" size={20} color="black" />
          <Text style={styles.text}>{`${TotalTimeInMins} mins`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="food-variant" size={20} color="black" />
          <Text style={styles.text}>{Diet}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="people-outline" size={20} color="black" />
          <Text style={styles.text}>{Servings}</Text>
        </View>
      </View>
    )
  }

  export default InfoContainer

  const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 15,
    },
    infoContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    text: {
        paddingLeft: 5
    },
  })