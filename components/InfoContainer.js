import * as React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const InfoContainer = ({PrepTimeInMins, CookTimeInMins, Servings}) => {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <CookingTimer CookTimeInMins={CookTimeInMins} PrepTimeInMins={PrepTimeInMins}/>
        </View>

        <View style={{...styles.infoContainer, justifyContent: 'center'}}>
          <MaterialIcons name="people-outline" size={20} color="black" />
          <Text style={styles.text}>{`${Servings} Servings`}</Text>
        </View>
      </View>
    )
  }

  function CookingTimer({PrepTimeInMins, CookTimeInMins}) {
    const [prepTime, setPrepTime] = React.useState(Number(PrepTimeInMins))
    const [cookTime, setCookTime] = React.useState(Number(CookTimeInMins))

    React.useEffect(() => {
      setPrepTime(prepTime/(prepTime + cookTime)*100)
      setCookTime(100 - prepTime)
    }, []) 

    return (
      <View style={{
        flex: 1, 
        paddingBottom: 25,
        flexDirection: 'row', 
        alignItems: 'center',
      }}>
        <MaterialIcons style={{padding: 10}} name="timer" size={20} color="black" />
        <View style={{
          flex:1, 
          height: 3, 
          maxWidth: `${prepTime}%`,
          borderTopLeftRadius: 3,
          borderBottomLeftRadius: 3,
          backgroundColor: 'red'
        }}>
          <View style={{paddingTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.text}>{`Prep ${PrepTimeInMins}`}</Text>
          </View>
        </View>

        <View style={{
          flex:1, 
          height:3, 
          maxWidth: `${cookTime}%`,
          borderTopRightRadius: 3,
          borderBottomRightRadius: 3,
          backgroundColor: 'blue'
        }}>
          <View style={{paddingTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.text}>{`Cook ${CookTimeInMins}`}</Text>
          </View>
        </View>
      </View>
    )
  }

  export default InfoContainer

  const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 15,
    },
    infoContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        paddingLeft: 5
    },
  })