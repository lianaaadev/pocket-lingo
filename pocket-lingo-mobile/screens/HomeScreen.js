import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import AuthService from '../services/authService';
import VocabService from '../services/vocabService';
import FlashCard from '../components/FlashCard';

const HomeScreen = () => {
  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateThenFetchVocabList = async () => {
      setLoading(true);

      try {
        let loginResult = await AuthService.checkLoggedIn();

        if (!loginResult) {
          // TODO: Implement a proper login flow
          const TEST_USERNAME = process.env.EXPO_PUBLIC_TEST_USERNAME;
          const TEST_PASSWORD = process.env.EXPO_PUBLIC_TEST_PASSWORD;

          await AuthService.login(TEST_USERNAME, TEST_PASSWORD);
        }

        const vocabResult = await VocabService.getVocabList();
        setVocabList(vocabResult);

      } catch (err) {
        setError('Failed to load vocabulary: ' + err.message);

      } finally {
        setLoading(false);
      }
    };

    authenticateThenFetchVocabList();
  }, []);

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
        {vocabList && vocabList.length > 0 &&
          vocabList.map((item) => (
          <FlashCard
            key={item.id}
            word={item.word}
            definition={item.definition}
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