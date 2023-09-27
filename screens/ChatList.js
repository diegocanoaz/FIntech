import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const chatData = [
  { id: '1', name: 'Juan Alvaro' },
  { id: '2', name: 'Juan Pablo' },
  { id: '3', name: 'Diego Susumu' },
  // ... add more sample chats as needed
];

const ChatList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('Chat', { chatName: item.name })}>
            <View style={styles.profilePic} />
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#EDEFF2',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  },
  chatName: {
    fontSize: 16,
    color: '#444',
    marginLeft: 15
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgrey', // Change this to whichever color you prefer for the blank profile picture
  }
});

export default ChatList;
