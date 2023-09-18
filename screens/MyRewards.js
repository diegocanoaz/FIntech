

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MyRewards = props => {
    
    return <View style={styles.container}>
    <Text>AQUI TENDREMOS EL APARTADO DE REWARDS, POR METERTE EN DIAS CONSECUTIVOS, INVITAR AMIGOS, CONECTAR ALIANZAS, ETC.</Text>

    
</View>
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}
})

export default MyRewards;