import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const mockData = {
  income: [
    { source: 'Salary', amount: 5000 },
    { source: 'Other', amount: 1500 }
  ],
  expenses: [
    { type: 'Rent', amount: 1200 },
    { type: 'Food', amount: 300 },
    { type: 'Leisure', amount: 200 }
  ]
};

const MyFinances = () => {
  const { income, expenses } = mockData;

  const totalIncome = income.reduce((acc, cur) => acc + cur.amount, 0);
  const totalExpenses = expenses.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.header}>MyFinances</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>Income</Text>
        {income.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.source}>{item.source}</Text>
            <Text style={styles.amount}>${item.amount}</Text>
          </View>
        ))}
        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total Income</Text>
          <Text style={styles.totalAmount}>${totalIncome}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Expenses</Text>
        {expenses.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.source}>{item.type}</Text>
            <Text style={styles.amount}>-${item.amount}</Text>
          </View>
        ))}
        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total Expenses</Text>
          <Text style={styles.totalAmount}>-${totalExpenses}</Text>
        </View>
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
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#DDE1E6'
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6495ED'
  },
  totalAmount: {
    fontSize: 18,
    color: '#444'
  }
});

export default MyFinances;

