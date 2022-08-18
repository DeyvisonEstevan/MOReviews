// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// import reviewsDatabase from './source/DataBase/reviewsDatabase.js';
// import Review from './source/Models/Review.js';
// import ReviewComponent from './source/Components/ReviewComponent.js';
// import {notificationManager} from './source/Services/NotificationManager';

// const notificador = notificationManager

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       nome: '',
//       episodio: 0,
//       temporada: 0,
//       situacao: '',
//       comentario: '',
//       lista: [],
//     };
//     this.Listar();
//   }

//   componentDidMount() {
//     notificador.configure()
//     notificador.createChannel()
//     notificador.showNotificationScheduled()
//   }

//   Listar = () => {
//     const banco = new reviewsDatabase();
//     banco.Listar().then(review => {
//       this.setState({lista: review});
//     });
//   };

//   Cadastrar = (nome, episodio, temporada, situacao, comentario) => {
//     const revNovo = new Review(nome, episodio, temporada, situacao, comentario);
//     const banco = new reviewsDatabase();
//     banco.Adicionar(revNovo);
//     this.Listar();
//   };

//   AlterarEpisodio = (rev) => {
//     const banco = new reviewsDatabase();
//     banco.AlterarEpisodio(rev);
//     this.Listar();
//   };

//   AlterarTemporada = (rev) => {
//     const banco = new reviewsDatabase();
//     banco.AlterarTemporada(rev);
//     this.Listar();
//   };

//   Assistindo = (id) => {
//     const banco = new reviewsDatabase();
//     banco.Assistindo(id);
//     this.Listar();
//   };

//   Visto = (id) => {
//     const banco = new reviewsDatabase();
//     banco.Visto(id);
//     this.Listar();
//   }; 

//   DeletarReview = (id) => {
//     const banco = new reviewsDatabase();
//     banco.Deletar(id);
//     this.Listar();
//   };

//   render() {
//     return (
//       <View style={style.fundo}>
//         <ScrollView>
//           <View style={style.containerTitulo}>
//             <Text style={style.titulo}>MOReviews</Text>
//           </View>
//           <View style={style.containerForm}>
//             <View style={style.form}>
//               <View style={style.containerTitulo}>
//                 <Text style={style.textoSessao}>O que quer acompanhar?</Text>
//               </View>
//               <View style={style.camposForm}>
//                 <Text style={style.textoCampos}>Vai ver o que?</Text>
//                 <TextInput
//                   onChangeText={input => {
//                     this.setState({nome: input});
//                   }}
//                   placeholder="Digite aqui"
//                   style={style.inputs}
//                 />
//                 <Text style={style.textoCampos}>Qual Temporada?</Text>
//                 <TextInput
//                   onChangeText={input => {
//                     this.setState({temporada: input});
//                   }}
//                   placeholder="Digite aqui"
//                   style={style.inputs}
//                 />
//                 <Text style={style.textoCampos}>Qual Episódio?</Text>
//                 <TextInput
//                   onChangeText={input => {
//                     this.setState({episodio: input});
//                   }}
//                   placeholder="Digite aqui"
//                   style={style.inputs}
//                 />
//                 <Text style={style.textoCampos}>O que está achando?</Text>
//                 <TextInput
//                   onChangeText={input => {
//                     this.setState({comentario: input});
//                   }}
//                   placeholder="Digite aqui"
//                   style={style.inputs}
//                 />
//               </View>
//               <TouchableOpacity
//                 style={{alignItems: 'center', justifyContent: 'center'}}
//                 onPress={() =>
//                   this.Cadastrar(
//                     this.state.nome,
//                     this.state.temporada,
//                     this.state.episodio,
//                     this.state.situacao,
//                     this.state.comentario,
//                   )
//                 }>
//                 <View style={style.adicionaBotao}>
//                   <Text style={style.textoAdiciona}>+</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={style.containerLista}>
//             <View style={style.containerTitulo}>
//               <Text style={style.textoSessao}>Acompanhe sua série aqui!</Text>
//             </View>
//             {this.state.lista.map(rev => (
//               <ReviewComponent
//                 key={rev.id}
//                 id={rev.id}
//                 rev={rev}
//                 nome={rev.nome}
//                 temporada={rev.temporada}
//                 episodio={rev.episodio}
//                 situacao={rev.situacao}
//                 comentario={rev.comentario}
//                 alterarepisodio={this.AlterarEpisodio}
//                 alterartemporada={this.AlterarTemporada}
//                 assistindo={this.Assistindo}
//                 visto={this.Visto}
//                 deletarreview={this.DeletarReview}
//               />
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const style = StyleSheet.create({
//   fundo: {
//     flex: 1,
//     backgroundColor: '#282828',
//   },

//   titulo: {
//     fontFamily: 'BarlowCondensed',
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#F5DA0A',
//   },

//   containerTitulo: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 7,
//   },

//   containerForm: {
//     backgroundColor: '#F5DA0A',
//     opacity: 0.6,
//     marginLeft: 10,
//     marginRight: 10,
//     borderRadius: 10,
//   },

//   form: {
//     opacity: 1,
//   },

//   textoSessao: {
//     fontFamily: 'BarlowCondensed-Regular',
//     fontSize: 20,
//     fontWeight: 'normal',
//     color: '#ffffff',
//     opacity: 1,
//   },

//   camposForm: {
//     marginLeft: 10,
//     marginRight: 10,
//   },

//   textoCampos: {
//     fontFamily: 'BarlowCondensed-Regular',
//     fontSize: 15,
//     fontWeight: 'normal',
//     color: '#ffffff',
//     opacity: 1,
//   },
//   inputs: {
//     borderWidth: 2,
//     borderColor: '#F5DA0A',
//     height: 35,
//     marginBottom: 5,
//     borderRadius: 10,
//   },

//   adicionaBotao: {
//     width: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 7,
//     borderWidth: 2,
//     borderColor: '#F5DA0A',
//     height: 40,
//     borderRadius: 10,
//   },

//   textoAdiciona: {
//     fontFamily: 'BarlowCondensed-Regular',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: 25,
//     fontWeight: 'normal',
//     color: '#F5DA0A',
//     opacity: 1,
//   },

//   containerLista: {
//     backgroundColor: '#F5DA0A',
//     opacity: 0.6,
//     margin: 10,
//     borderRadius: 10,
//   },
// });