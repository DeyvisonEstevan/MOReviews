import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class ReviewComponent extends Component {
  
  getEstilo() {
    if(this.props.situacao == 'assistindo') {
      return { color: '#f5580a', fontWeight: 'bold'}
    } else if (this.props.situacao == 'visto') {
      return {color: '#056926', fontWeight: 'bold' } 
    } else {
      return { color:'black' } 
    }
  }
  
  render() {
    return (
      <View style={style.review}>
        <View style={style.containerExcluir}>
          <TouchableOpacity
            style={style.botaoExcuir}
            onPress={() => this.props.deletarreview(this.props.id)}>
            <Text style={style.textoExcluir}>X</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.textoCampos}>{this.props.nome}</Text>
        <View style={style.containerControles}>
          <View style={style.containerBotoes}>
            <TouchableOpacity
              style={style.botoesControle}
              onPress={() => this.props.alterartemporada(this.props.rev)}>
              <Text style={style.textoControle}>▲</Text>
            </TouchableOpacity>
            <View style={style.controleSeries}>
              <Text style={style.textoControles}>S {this.props.temporada}</Text>
              <Text style={style.textoControles}>X</Text>
              <Text style={style.textoControles}>E {this.props.episodio}</Text>
            </View>
            <TouchableOpacity
              style={style.botoesControle}
              onPress={() => this.props.alterarepisodio(this.props.rev)}>
              <Text style={style.textoControle}>▲</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.botoesControle} onPress={() => this.props.assistindo(this.props.id)}>
            <Text style={style.textoControle}>▲</Text>
          </TouchableOpacity>
          <View style={style.controleSituacao}>
            <Text style={style.textoControles}><Text style={this.getEstilo()}>{this.props.situacao}</Text></Text>
          </View>
          <TouchableOpacity style={style.botoesControle} onPress={() => this.props.visto(this.props.id)}>
            <Text style={style.textoControle}>▼</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.textoCampos}>Comentário:</Text>
        <Text style={style.textoComentarios}>{this.props.comentario}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  review: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#F5DA0A',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 10,
    padding: 5,
  },

  textoCampos: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 15,
    fontWeight: 'normal',
    color: '#ffffff',
    opacity: 1,
  },

  textoComentarios: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#ffffff',
    opacity: 1,
  },

  textoControles: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    opacity: 1,
  },

  controleSeries: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5DA0A',
    width: 60,
    borderRadius: 10,
  },

  controleSituacao: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5DA0A',
    width: 60,
    borderRadius: 10,
  },

  containerControles: {
    flex: 1,
    marginTop: 5,
    merginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  containerBotoes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  botoesControle: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    borderWidth: 2,
    borderColor: '#F5DA0A',
    height: 20,
    borderRadius: 10,
  },

  textoControle: {
    fontFamily: 'BarlowCondensed-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F5DA0A',
    opacity: 1,
  },

  botaoExcuir: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    borderWidth: 2,
    borderColor: '#282828',
    height: 20,
    borderRadius: 10,
  },

  textoExcluir: {
    fontFamily: 'BarlowCondensed-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
    color: '#282828',
    opacity: 1,
  },

  containerExcluir: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
