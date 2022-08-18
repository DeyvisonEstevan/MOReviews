import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

export default function MovieSuggestions({item}) {
  return (
    <View style={style.containerSuggestion}>
      <View style={style.containerImage}>
        <Text style={style.textoTitle}>{item.original_title}</Text>
        <Text style={style.textoDate}>{item.release_date}</Text>
        <Image
          style={{resizeMode: 'contain', height: 180}}
          source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
        />
      </View>
      <View style={style.containerOverview}>
        <Text style={style.textoDescription}>Descrição</Text>
        <ScrollView>
          <Text style={style.textoOverview}>{item.overview}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  containerSuggestion: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#a39316',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 10,
    padding: 5,
  },

  containerImage: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#d4be0f',
    margin: 5,
    borderRadius: 10,
    padding: 5,
    height: 270
  },

  containerOverview: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#d4be0f',
    margin: 5,
    borderRadius: 10,
    padding: 5,
    height: 270
  },

  textoTitle: {
    fontFamily: 'BarlowCondensed-Regular',
    marginLeft: 10,
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    opacity: 1,
  },

  textoDate: {
    fontFamily: 'BarlowCondensed-Regular',
    marginLeft: 10,
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '400',
    color: '#ffffff',
    opacity: 1,
  },

  textoDescription: {
    fontFamily: 'BarlowCondensed-Regular',
    justifyContent: 'center',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    opacity: 1,
  },

  textoOverview: {
    fontFamily: 'BarlowCondensed-Regular',
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#ffffff',
    opacity: 1,
  },

  
});
