import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ScrollView, Text } from 'react-native';

const FilterComponent = ({filterName, selected}) => {
  return (
    <View style={{...styles.container, backgroundColor: selected ? 'blue' : ''}}>
      <Text style={{color: selected ? 'white' : ''}}>{filterName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 5, 
    borderWidth: 1
  }
})

export default FilterComponent