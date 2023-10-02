import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProjectDetails = ({ route }) => {
  const { project } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{project.name}</Text>
      <Text style={styles.details}>Collected Amount: ${project.collectedAmount}</Text>
      {/* Add functionality to contribute money here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6495ED',
  },
  details: {
    fontSize: 18,
    color: '#444',
  },
});

export default ProjectDetails;
