import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';

const chatData = [
  { id: '1', name: 'Juan Alvaro' },
  { id: '2', name: 'Juan Pablo' },
  { id: '3', name: 'Diego Susumu' },
  { id: '4', name: 'Pia Gonzalez' },
  { id: '5', name: 'Juan Diego Leaño' },
  // ... add more sample chats as needed
];

const ChatList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredChats = chatData.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Search for a chat..."
        style={styles.searchBar}
      />
      <FlatList
        data={filteredChats}
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
  searchBar: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
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
    backgroundColor: 'lightgrey',
  }
});

export default ChatList;

