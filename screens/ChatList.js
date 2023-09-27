// ChatList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const chatData = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  // Add more sample chats as needed
];

const ChatList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('Chat', { chatName: item.name })}>
            <Text style={styles.chatName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA'
  },
  chatItem: {
    padding: 15,
    borderBottomColor: '#EDEFF2',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  },
  chatName: {
    fontSize: 16,
    color: '#444'
  }
});

export default ChatList;
