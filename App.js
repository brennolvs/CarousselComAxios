import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Axios from 'axios';
import Carousel from 'react-native-x-carousel';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [productData, setProductData] = useState([]);
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    Axios.get('http://192.168.0.103:3000/produtos')
      .then(response => {
        const produtos = response.data.produtos.map(item => item.nome);
        setProductData(produtos);

        // Criei uma URLs de imagens da web
        const imageUrls = [
          'https://abre.ai/gY1d',
          'https://abre.ai/gY1l',
          'https://abre.ai/gY1A',
          'https://abre.ai/gY1Y',
          'http://i.pinimg.com/564x/e6/b8/f8/e6b8f8c516a80440cac570cefddc175f.jpg',
          'https://abre.ai/gY16',
          'https://abre.ai/gY4e'
        ];

        // Criei um array com os objetos do carrossel
        const carouselItems = produtos.map((nome, index) => ({
          coverImageUri: imageUrls[index], // URL da imagem correspondente
          cornerLabelColor: '#FF0000',
          cornerLabelText: nome,
        }));

        setCarouselData(carouselItems);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  const renderItem = data => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <Image style={styles.card} source={{ uri: data.coverImageUri }} />
      <View style={[styles.cornerLabel, { backgroundColor: data.cornerLabelColor }]}>
        <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          data={carouselData}
          renderItem={renderItem}
          loop
          autoplay
          direction="vertical"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  card: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default App;
