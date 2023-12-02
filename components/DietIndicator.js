import { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';

const nonVegIndicators = ['Non Vegeterian', 'High Protein Non Vegetarian']
const vegIndicators = ['Vegetarian', 'High Protein Vegetarian', 'Vegan', 'No Onion No Garlic (Sattvic)']
const eggitarian = ['Eggetarian']

export const isVeg = (Diet) => {
  return vegIndicators.includes(Diet)
}

export const isNonVeg = (Diet) => {
  return nonVegIndicators.includes(Diet)
}

export const isEggitarian = (Diet) => {
  return eggitarian.includes(Diet)
}

export default function DietIndicator({Diet, size=10}) {
  const [dietColor, setDietColor] = useState('white')

  useEffect(() => {
    if (isNonVeg(Diet)) {
      setDietColor('red')
    }
    if (isVeg(Diet)) {
      setDietColor('green')
    }
    if (isEggitarian(Diet)) {
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