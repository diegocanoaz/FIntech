
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const My = props => {
    
    return <View style={styles.container}>
        <Text>HOME SCREEN</Text>

    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        FontSize: 20,
    }
})

export default My;