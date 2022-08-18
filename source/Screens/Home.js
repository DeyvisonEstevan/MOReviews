import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';


export default function Home({navigation}) {

    return (
      <View style={style.fundo}>
        <ScrollView>
          <View style={style.containerTitulo}>
            <Text style={style.titulo}>MOReviews</Text>
          </View>
          <View style={style.containerLogo}>
            <Image
              style={style.imgLogo}
              source={require('../Imagens/logo-moreviews2.png')}
            />
          </View>
          <View style={style.containerButtoms}>
            <TouchableOpacity onPress={()=> navigation.navigate('Sugestões')}>
              <View style={style.adicionaBotao}>
                <Text style={style.textoButtoms}>O que está no Hype?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Registro')}>
              <View style={style.adicionaBotao}>
                <Text style={style.textoButtoms}>O que quer acompanhar?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Lista')}>
              <View style={style.adicionaBotao}>
                <Text style={style.textoButtoms}>
                  Acompanhe sua série aqui!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
  },

  containerLogo: {
    flex: 1,
    marginTop: 40,
    marginBottom: 40,
  },

  imgLogo: {
    flex: 1,
    alignSelf: 'center',
    width: 200,
    height: 200,
  },

  containerButtoms: {
    backgroundColor: '#F5DA0A',
    opacity: 0.6,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },

  textoButtoms: {
    alignSelf: 'center',
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 20,
    fontWeight: 'normal',
    color: '#ffffff',
    opacity: 1,
  },

  adicionaBotao: {
    width: 330,
    alignSelf: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: '#F5DA0A',
    height: 40,
    borderRadius: 10,
  },

});
