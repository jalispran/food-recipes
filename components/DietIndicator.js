import { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';

const nonVegIndicators = ['Non Vegeterian', 'High Protein Non Vegetarian']
const vegIndicators = ['Vegetarian', 'High Protein Vegetarian', 'Vegan', 'No Onion No Garlic (Sattvic)']
const eggitarian = ['Eggetarian']

export default function DietIndicator({Diet, size=10}) {
  const [dietColor, setDietColor] = useState('white')

  useEffect(() => {
    if (nonVegIndicators.includes(Diet)) {
      setDietColor('red')
    }
    if (vegIndicators.includes(Diet)) {
      setDietColor('green')
    }
    if (eggitarian.includes(Diet)) {
      setDietColor('orange')
    }
  }, [dietColor])

  return (
    <View style={{
      ...styles.dietIndicator,
      borderWidth: size, 
      borderRadius: size,
      borderColor: dietColor,
      backgroundColor: dietColor,
    }} />
  )
}

const styles = StyleSheet.create({
  dietIndicator: {
    flex:1,
  }
})