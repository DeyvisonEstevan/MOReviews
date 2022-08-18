import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import reviewsDatabase from '../DataBase/reviewsDatabase.js';
import ReviewComponent from '../Components/ReviewComponent.js';


export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      episodio: 0,
      temporada: 0,
      situacao: '',
      comentario: '',
      lista: [],
    };
    this.Listar();
  }

  Listar = () => {
    const banco = new reviewsDatabase();
    banco.Listar().then(review => {
      this.setState({lista: review});
    });
  };

  AlterarEpisodio = (rev) => {
    const banco = new reviewsDatabase();
    banco.AlterarEpisodio(rev);
    this.Listar();
  };

  AlterarTemporada = (rev) => {
    const banco = new reviewsDatabase();
    banco.AlterarTemporada(rev);
    this.Listar();
  };

  Assistindo = (id) => {
    const banco = new reviewsDatabase();
    banco.Assistindo(id);
    this.Listar();
  };

  Visto = (id) => {
    const banco = new reviewsDatabase();
    banco.Visto(id);
    this.Listar();
  }; 

  DeletarReview = (id) => {
    const banco = new reviewsDatabase();
    banco.Deletar(id);
    this.Listar();
  };

  render() {
    return (
      <View style={style.fundo}>
        <ScrollView>
          <View style={style.containerTitulo}>
            <Text style={style.titulo}>MOReviews</Text>
          </View>
          <View style={style.containerLista}>
            <View style={style.containerTitulo}>
              <Text style={style.textoSessao}>Acompanhe sua série aqui!</Text>
            </View>
            {this.state.lista.map(rev => (
              <ReviewComponent
                key={rev.id}
                id={rev.id}
                rev={rev}
                nome={rev.nome}
                temporada={rev.temporada}
                episodio={rev.episodio}
                situacao={rev.situacao}
                comentario={rev.comentario}
                alterarepisodio={this.AlterarEpisodio}
                alterartemporada={this.AlterarTemporada}
                assistindo={this.Assistindo}
                visto={this.Visto}
                deletarreview={this.DeletarReview}
              />
            ))}
          </View>
        </ScrollView>
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

  containerLista: {
    backgroundColor: '#F5DA0A',
    opacity: 0.6,
    margin: 10,
    borderRadius: 10,
  },

  textoSessao: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 20,
    fontWeight: 'normal',
    color: '#ffffff',
    opacity: 1,
  },
});