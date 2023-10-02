import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const MyCommunity = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim().length > 0) {
      setMessages([...messages, { sender: 'user', text: input.trim() }]);
      setInput('');
      
      // Simulating computer response after user sends a message
      setTimeout(() => {
        setMessages([...messages, { sender: 'user', text: input.trim() }, { sender: 'computer', text: 'Hola' }]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.computerMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EDEFF2',
    padding: 10,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#EDEFF2',
    borderWidth: 1,
    marginRight: 10
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#6495ED',
    borderRadius: 10
  },
  sendText: {
    color: '#FFF'
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E1F5FE'
  },
  computerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDEFF2'
  },
  messageText: {
    color: '#444'
  }
});

export default MyCommunity;
