import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Review.db';
const database_version = '1.0';
const database_displayname = 'Review Database';
const database_size = 200000;

export default class Database {
  Conectar() {
    let db;
    return new Promise(resolve => {
      console.log('Checando a integridade do plugin ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integridade Ok ...');
          console.log('Abrindo Banco de Dados ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Banco de dados Aberto');
              db.executeSql('SELECT 1 FROM Review LIMIT 1')
                .then(() => {
                  console.log(
                    'O banco de dados está pronto ... Executando Consulta SQL ...',
                  );
                })
                .catch(error => {
                  console.log('Erro Recebido: ', error);
                  console.log(
                    'O Banco de dados não está pronto ... Criando Dados',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Review (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(30), episodio DOUBLE, temporada DOUBLE, situacao varchar(10), comentario varchar(100))',
                    );
                  })
                    .then(() => {
                      console.log('Tabela criada com Sucesso');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest Falhou - plugin não funcional');
        });
    });
  }

  Desconectar(db) {
    if (db) {
      console.log('Fechando Banco de Dados');
      db.close()
        .then(status => {
          console.log('Banco de dados Desconectado!!');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('A conexão com o banco não está aberta');
    }
  }

  Listar() {
    return new Promise(resolve => {
      const reviews = [];
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Review', []).then(
              ([tx, resultados]) => {
                console.log('Consulta completa');
                var len = resultados.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = resultados.rows.item(i);
                  const {id, nome, episodio, temporada, situacao, comentario} =
                    row;
                  reviews.push({
                    id,
                    nome,
                    episodio,
                    temporada,
                    situacao,
                    comentario,
                  });
                }
                console.log(reviews);
                resolve(reviews);
              },
            );
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  BuscarPorId(id) {
    console.log(id);
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Review WHERE id = ?', [id]).then(
              ([tx, resultados]) => {
                console.log(resultados);
                if (resultados.rows.length > 0) {
                  let row = resultados.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  Adicionar(rev) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Review (nome, episodio, temporada, situacao, comentario) VALUES (?, ?, ?, ?, ?)', [
              rev.nome,
              rev.episodio,
              rev.temporada,
              rev.situacao,
              rev.comentario,
            ]).then(([tx, resultados]) => {
              resolve(resultados);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  AlterarEpisodio(rev) {
      return new Promise((resolve) => {
          this.Conectar().then((db) => {
              db.transaction((tx) => {
                  tx.executeSql('UPDATE Review SET episodio = ? WHERE id = ?', [rev.episodio +1, rev.id]).then(([tx, resultados]) => {
                      resolve(resultados);
                  });
              }).then((result) => {
                  this.Desconectar(db);
              }).catch((err) => {
                  console.log(err);
              });
          }).catch((err) => {
              console.log(err);
          });
      });
  }

  AlterarTemporada(rev) {
    return new Promise((resolve) => {
        this.Conectar().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Review SET temporada = ? WHERE id = ?', [rev.temporada + 1, rev.id]).then(([tx, resultados]) => {
                    resolve(resultados);
                });
            }).then((result) => {
                this.Desconectar(db);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });
}

Assistindo(id) {
  return new Promise((resolve) => {
      this.Conectar().then((db) => {
          db.transaction((tx) => {
              tx.executeSql('UPDATE Review SET situacao = "assistindo" WHERE id = ?', [id]).then(([tx, resultados]) => {
                  resolve(resultados);
              });
          }).then((result) => {
              this.Desconectar(db);
          }).catch((err) => {
              console.log(err);
          });
      }).catch((err) => {
          console.log(err);
      });
  });
}

Visto(id) {
  return new Promise((resolve) => {
      this.Conectar().then((db) => {
          db.transaction((tx) => {
              tx.executeSql('UPDATE Review SET situacao = "visto" WHERE id = ?', [id]).then(([tx, resultados]) => {
                  resolve(resultados);
              });
          }).then((result) => {
              this.Desconectar(db);
          }).catch((err) => {
              console.log(err);
          });
      }).catch((err) => {
          console.log(err);
      });
  });
}

// Alterar(id, rev) {
//   return new Promise((resolve) => {
//       this.Conectar().then((db) => {
//           db.transaction((tx) => {
//               tx.executeSql('UPDATE Review SET nome = ?, episodio = ?, temporada = ?, situacao = ?, comentario = ? WHERE id = ?', [rev.nome, rev.episodio, rev.temporada, rev.situacao, rev.comentario, id]).then(([tx, resultados]) => {
//                   resolve(resultados);
//               });
//           }).then((result) => {
//               this.Desconectar(db);
//           }).catch((err) => {
//               console.log(err);
//           });
//       }).catch((err) => {
//           console.log(err);
//       });
//   });
// }

  // Atrasar (id) {
  //   return new Promise(resolve => {
  //     this.Conectar()
  //       .then(db => {
  //         db.transaction(tx => {
  //           tx.executeSql(
  //             "UPDATE Tarefa SET situacao = 'Atrasado' WHERE id = ?",
  //             [id],
  //           ).then(([tx, results]) => {
  //             resolve(results)
  //           })
  //         })
  //           .then(result => {
  //             this.Desconectar(db)
  //           })
  //           .catch(err => {
  //             console.log(err)
  //           })
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   })
  // }

  // Adiantar (id) {
  //   return new Promise(resolve => {
  //     this.Conectar()
  //       .then(db => {
  //         db.transaction(tx => {
  //           tx.executeSql(
  //             "UPDATE Tarefa SET situacao = 'Adiantado' WHERE id = ?",
  //             [id],
  //           ).then(([tx, results]) => {
  //             resolve(results)
  //           })
  //         })
  //           .then(result => {
  //             this.Desconectar(db)
  //           })
  //           .catch(err => {
  //             console.log(err)
  //           })
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   })
  // }

  Deletar(id) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Review WHERE id = ?', [id]).then(
              ([tx, resultados]) => {
                console.log(resultados);
                resolve(resultados);
              },
            );
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
