import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyFinances = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [newIncomeSource, setNewIncomeSource] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');

  const [newExpenseType, setNewExpenseType] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedIncome = JSON.parse(await AsyncStorage.getItem('income')) || [];
      const storedExpenses = JSON.parse(await AsyncStorage.getItem('expenses')) || [];
      
      setIncome(storedIncome);
      setExpenses(storedExpenses);
    }

    fetchData();
  }, []);

  const addIncome = async () => {
    const updatedIncome = [...income, { source: newIncomeSource, amount: parseFloat(newIncomeAmount) }];
    setIncome(updatedIncome);
    await AsyncStorage.setItem('income', JSON.stringify(updatedIncome));
    setNewIncomeSource('');
    setNewIncomeAmount('');
  }

  const addExpense = async () => {
    const updatedExpenses = [...expenses, { type: newExpenseType, amount: parseFloat(newExpenseAmount) }];
    setExpenses(updatedExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setNewExpenseType('');
    setNewExpenseAmount('');
  }

  const deleteIncome = async (index) => {
    const updatedIncome = [...income];
    updatedIncome.splice(index, 1);
    setIncome(updatedIncome);
    await AsyncStorage.setItem('income', JSON.stringify(updatedIncome));
  }

  const deleteExpense = async (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>MyFinances</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>Income</Text>
        {income.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.source}>{item.source}</Text>
            <Text style={styles.amount}>${formatNumber(item.amount.toFixed(2))}</Text>
            <Button title="Delete" onPress={() => deleteIncome(index)} />
          </View>
        ))}
        <TextInput
          placeholder="Income Source"
          value={newIncomeSource}
          onChangeText={setNewIncomeSource}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={newIncomeAmount}
          onChangeText={setNewIncomeAmount}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Add Income" onPress={addIncome} />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Expenses</Text>
        {expenses.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.source}>{item.type}</Text>
            <Text style={styles.amount}>-${formatNumber(item.amount.toFixed(2))}</Text>
            <Button title="Delete" onPress={() => deleteExpense(index)} />
          </View>
        ))}
        <TextInput
          placeholder="Expense Type"
          value={newExpenseType}
          onChangeText={setNewExpenseType}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={newExpenseAmount}
          onChangeText={setNewExpenseAmount}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Add Expense" onPress={addExpense} />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6495ED'
  },
  section: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFF2',
    paddingVertical: 10,
  },
  source: {
    fontSize: 16,
    color: '#666'
  },
  amount: {
    fontSize: 16,
    color: '#444'
  },
  input: {
    borderColor: '#EDEFF2',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  }
});

export default MyFinances;
