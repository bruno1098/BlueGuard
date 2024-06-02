import React from 'react';
import { View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LogBox } from 'react-native';

// Ignorar todos os warnings
LogBox.ignoreAllLogs();

export default function Index() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#007BFF', dark: '#004C99' }}
      headerImage={
        <ThemedView style={styles.header}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <ThemedText style={styles.title}>BlueGuard</ThemedText>
          
        </ThemedView>
      }
    >
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>A Importância da Conservação Marinha</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Os oceanos cobrem mais de 70% da superfície da Terra e são essenciais para a regulação do clima, fornecimento de alimentos e suporte à biodiversidade. Coral reefs, por exemplo, cobrem apenas 0.2% do fundo do mar, mas abrigam mais de 25% das espécies marinhas.
        </ThemedText>
        <Image
          source={require('@/assets/images/coral.jpg')} //coral
          style={styles.image}
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Desafios Atuais</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          A poluição, a sobrepesca e as mudanças climáticas estão colocando em risco nossos ecossistemas marinhos. Estima-se que 11 milhões de toneladas de plásticos entrem nos oceanos anualmente, e até 2040, esse número pode chegar a 29 milhões de toneladas.
        </ThemedText>
        <Image
          source={require('@/assets/images/poluicao.jpg')} //oceânica
          style={styles.image}
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Soluções Propostas pelo BlueGuard</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Um app amigável e acessível que permite às pessoas comuns se tornarem defensores dos oceanos. Através dele, usuários podem relatar avistamentos de poluição, participar de campanhas de limpeza e aprender sobre a importância da conservação marinha.
        </ThemedText>
        <Image
          source={require('@/assets/images/comunidade.jpg')} //ccomudidade
          style={styles.image}
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Impacto das Áreas Marinhas Protegidas (AMPs)</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          As AMPs são essenciais para a conservação da biodiversidade marinha. Na UE, a extensão das AMPs cresceu de 216,742 km² em 2012 para 611,550 km² em 2021, representando 12.1% da área marinha total. O objetivo é alcançar 30% até 2030.
        </ThemedText>
        <Image
          source={{ uri: 'https://wwfbrnew.awsassets.panda.org/img/original/2ebf089f_7873_4774_a529_9d4cd9a2765b.jpg' }} //marinha protegifda
          style={styles.image}
        />
      </ThemedView>

      <ThemedView style={styles.footer}>
        <Button title="Saiba Mais" onPress={() => {}} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    marginBottom: 20,
  },
});
