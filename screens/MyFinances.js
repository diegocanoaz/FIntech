import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyFinances = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [newIncomeSource, setNewIncomeSource] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newExpenseType, setNewExpenseType] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const fetchIncome = async () => {
    const storedIncome = await AsyncStorage.getItem('income');
    if (storedIncome) setIncome(JSON.parse(storedIncome));
  };

  const fetchExpenses = async () => {
    const storedExpenses = await AsyncStorage.getItem('expenses');
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
  };

  useEffect(() => {
    fetchIncome();
    fetchExpenses();
  }, []);

  const formatNumber = (number) => {
    return Number(number).toLocaleString('en-US');
  };

  const handleAddIncome = async () => {
    if (newIncomeSource && newIncomeAmount) {
      const updatedIncome = [...income, { source: newIncomeSource, amount: parseFloat(newIncomeAmount) }];
      await AsyncStorage.setItem('income', JSON.stringify(updatedIncome));
      setIncome(updatedIncome);
      setNewIncomeSource('');
      setNewIncomeAmount('');
    }
  };

  const handleAddExpense = async () => {
    if (newExpenseType && newExpenseAmount) {
      const updatedExpenses = [...expenses, { type: newExpenseType, amount: parseFloat(newExpenseAmount) }];
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
      setNewExpenseType('');
      setNewExpenseAmount('');
    }
  };

  const handleDeleteIncome = async (indexToDelete) => {
    const updatedIncome = income.filter((_, index) => index !== indexToDelete);
    await AsyncStorage.setItem('income', JSON.stringify(updatedIncome));
    setIncome(updatedIncome);
  };

  const handleDeleteExpense = async (indexToDelete) => {
    const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  const totalIncome = income.reduce((acc, cur) => acc + cur.amount, 0);
  const totalExpenses = expenses.reduce((acc, cur) => acc + cur.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>MyFinances</Text>
        <View style={styles.section}>
          <Text style={styles.title}>Income</Text>
          {income.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.source}>{item.source}: ${formatNumber(item.amount)}</Text>
              <TouchableOpacity onPress={() => handleDeleteIncome(index)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.inputGroup}>
            <TextInput placeholder="Source" value={newIncomeSource} onChangeText={setNewIncomeSource} style={styles.input} />
            <TextInput placeholder="Amount" value={newIncomeAmount} onChangeText={setNewIncomeAmount} keyboardType="numeric" style={styles.input} />
            <Button title="Add Income" onPress={handleAddIncome} />
          </View>
          <View style={styles.total}>
            <Text style={styles.totalLabel}>Total Income</Text>
            <Text style={styles.totalAmount}>${formatNumber(totalIncome)}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Expenses</Text>
          {expenses.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.source}>{item.type}: ${formatNumber(item.amount)}</Text>
              <TouchableOpacity onPress={() => handleDeleteExpense(index)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.inputGroup}>
            <TextInput placeholder="Type" value={newExpenseType} onChangeText={setNewExpenseType} style={styles.input} />
            <TextInput placeholder="Amount" value={newExpenseAmount} onChangeText={setNewExpenseAmount} keyboardType="numeric" style={styles.input} />
            <Button title="Add Expense" onPress={handleAddExpense} />
          </View>
          <View style={styles.total}>
            <Text style={styles.totalLabel}>Total Expenses</Text>
            <Text style={styles.totalAmount}>-${formatNumber(totalExpenses)}</Text>
          </View>
        </View>
        <View style={styles.balanceSection}>
          <Text style={styles.title}>Balance</Text>
          <Text style={[styles.totalBalance, totalBalance >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
            ${formatNumber(totalBalance)}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6495ED',
  },
  section: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
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
    color: '#666',
  },
  deleteButton: {
    color: 'red',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EDEFF2',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  balanceSection: {
    marginVertical: 20,
    alignItems: 'center',
  },
  totalBalance: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  positiveBalance: {
    color: 'green',
  },
  negativeBalance: {
    color: 'red',
  },
});

export default MyFinances;

