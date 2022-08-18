import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image
} from 'react-native';
import MovieSuggestions from '../Components/MovieSuggestions';

export default class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: [],
      isLoading: true,
    };
  }

  getTMDB = () => {
    this.setState({isLoading: true})
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=0a2385dfef979bc084151658184e1c11')
      .then(response => response.json())
      .then((json) => {
        this.setState({dados: json.results})
      })

      this.setState({isLoading: false})
  };

  componentDidMount() {
    this.getTMDB();
  }

  render() {

    return (
      <View style={style.fundo}>
        <View style={style.containerTitulo}>
          <Text style={style.titulo}>MOReviews</Text>
        </View>
        <View style={style.containerTitulo}>
          <Text style={style.textoSessao}>O que está no Hype?</Text>
        </View>
        {this.state.isLoading ? <ActivityIndicator/> : (
          <FlatList
            data = {this.state.dados}
            renderItem={({ item }) => MovieSuggestions({item})}
          />
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#282828',
  },

  titulo: {
    fontFamily: 'BarlowCondensed',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F5DA0A',
  },

  containerTitulo: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
  },

  textoSessao: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 20,
    fontWeight: 'normal',
    color: '#ffffff',
    opacity: 1,
  },
});
