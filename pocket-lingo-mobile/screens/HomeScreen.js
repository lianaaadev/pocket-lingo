import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import FlashCard from '../components/FlashCard';

// Mock vocabulary data
const mockVocabulary = [
  {
    id: 1,
    word: 'Ubiquitous',
    translation: 'Found everywhere',
    example: 'Smartphones are ubiquitous in modern society.'
  },
  {
    id: 2,
    word: 'Ephemeral',
    translation: 'Lasting for a very short time',
    example: 'The beauty of cherry blossoms is ephemeral.'
  },
  {
    id: 3,
    word: 'Perspicacious',
    translation: 'Having sharp understanding',
    example: 'The detective was perspicacious in solving the mystery.'
  },
  {
    id: 4,
    word: 'Serendipity',
    translation: 'A pleasant surprise',
    example: 'Finding that old book was pure serendipity.'
  },
  {
    id: 5,
    word: 'Mellifluous',
    translation: 'Sweet and smooth sounding',
    example: 'The singer\'s mellifluous voice filled the concert hall.'
  }
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pocket Lingo</Text>
        <Text style={styles.subtitle}>Expand your vocabulary one word at a time</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockVocabulary.map((item) => (
          <FlashCard
            key={item.id}
            word={item.word}
            translation={item.translation}
            example={item.example}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default HomeScreen; 