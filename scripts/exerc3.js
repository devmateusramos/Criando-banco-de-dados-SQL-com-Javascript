/* Com base no nome da tabela e nas colunas, monte uma estrutura de 
objetos para armazenar tanto a definição da tabela quanto os dados. 
Crie um objeto chamado "database".
Dentro do objeto "database", crie um objeto chamado "tables".
Dentro do objeto "tables", crie um objeto com o nome da tabela.
Dentro do objeto criado com o nome da tabela, crie um objeto chamado "columns",
onde as chaves são representadas pelo nome da coluna e o valor pelo tipo.
Dentro do objeto criado com nome da tabela, crie um array chamado "data".
Exiba o conteúdo do objeto "database" utilizando JSON.stringify */

const database = {
    tables: {},
    createTable(statement) {// uma coisa interessante a se perceber aqui é q o JSON n exibe funções, pra ver q essa função foi criado tem q dar um console.log database
       
        const regexp = /create table ([a-z]+) \((.+)\)/;
        const parsedStatement = statement.match(regexp);
        const tableName = parsedStatement[1];
        this.tables[tableName]={
            columns:{},
            data: {}
        };
        let columns = parsedStatement[2];
        columns = columns.split(", ");
        for (let column of columns){
            column = column.split(" ");/*  poderia caso não tivesse posto split lá em columns com ", " e sim só a ",", só passar column.trim.split(" ") q daria certo */
            const name = column[0];
            const type = column[1];
            this.tables[tableName].columns[name] = type;
        }

    },
    execute(statement) {
        if (statement.startsWith("create table")) {
        return this.createTable(statement);
        }
    }
};
database.execute("create table author (id number, name string, age number, city string, state string, country string)");

// console.log(database);/* Não dá uma boa exibição por isso podemos usar oJSON pra exibir melhor */
console.log(JSON.stringify(database, undefined, " "));