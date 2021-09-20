// import {Database} from "./database"; // se estivesse usando console do node faria isso pro export. Não vou fazer pq estou subindo como html e mesmo usando type module no html não funcionou no meu navegador, mas vou deixar aqui 
// // como prática mesmo como se fosse um module separado pra caso eu abro no console do node um dia é só remover o comentário e utilizar o export e import, 
// // hoje vou simplesmente usar o arquivo no html mas já deixar separado os "módulos".

    const database = new Database();
    database.execute("create table author (id number, name string, age number, city string, state string, country string)").then(function(){
        return Promise.all([
            database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)"),
            database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)"),
            database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)")
        ]).then(function(){
           return database.execute("select name, age from author").then(function(result) {
               console.log(JSON.stringify(result, undefined, " "));
           });
        }).catch(function(e) {
            console.log(e.message);
        });
    });
    
    
    // database.execute("delete from author where id = 2");
    // console.log(JSON.stringify(database.execute("select name, age from author"), undefined, " "));// O FATO DO AUTHOR TER Q TER ESPAÇO ERA UM ESPAÇO A MAIS NA REGEXP Q QND REMOVIDO QUEBRAVA PORQUE SÓ APÓS REMOVER PODIA POR UM DPS DO ?: SEM QUEBRAR TAMBÉM.
    
