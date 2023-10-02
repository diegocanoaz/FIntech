import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const MyProjects = ({ navigation }) => {
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleCreateProject = () => {
    if (projectName) {
      const newProject = {
        id: Date.now(),
        name: projectName,
        collectedAmount: 0,
      };
      setProjects([...projects, newProject]);
      setProjectName('');
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleStartEdit = (id, name) => {
    setIsEditing(id);
    setEditingText(name);
  };

  const handleConfirmEdit = (id) => {
    const updatedProjects = projects.map(project => {
      if (project.id === id) {
        return { ...project, name: editingText };
      }
      return project;
    });
    setProjects(updatedProjects);
    setIsEditing(null);
    setEditingText('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Create New Project</Text>
      <TextInput placeholder="Project Name" value={projectName} onChangeText={setProjectName} style={styles.input} placeholderTextColor="#A4A9B7" />
      <TouchableOpacity style={styles.button} onPress={handleCreateProject}>
        <Text style={styles.buttonText}>Create Project</Text>
      </TouchableOpacity>

      <DraggableFlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index, drag, isActive }) => (
          <View style={styles.projectItem}>
            <TouchableOpacity 
              onLongPress={drag}
              style={styles.projectNameContainer}
            >
              {isEditing === item.id ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    value={editingText}
                    onChangeText={setEditingText}
                    style={styles.projectNameInput}
                    onBlur={() => handleConfirmEdit(item.id)}
                  />
                  <TouchableOpacity onPress={() => handleConfirmEdit(item.id)}>
                    <Text style={styles.confirmEditButton}>✓</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text 
                  style={styles.projectName} 
                  onPress={() => handleStartEdit(item.id, item.name)}
                >
                  {item.name}
                </Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProject(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        onDragEnd={({ data }) => setProjects(data)}
      />
    </ScrollView>
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
  input: {
    borderWidth: 1,
    borderColor: '#EDEFF2',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: '#444',
  },
  button: {
    padding: 10,
    backgroundColor: '#6495ED',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectItem: {
    borderWidth: 1,
    borderColor: '#EDEFF2',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  projectNameInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EDEFF2',
    marginRight: 10,
  },
  confirmEditButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6495ED',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#FFF',
  },
  projectNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MyProjects;
