/* Com base no nome da tabela e nas colunas, monte uma estrutura de 
objetos para armazenar tanto a definição da tabela quanto os dados. 
Crie um objeto chamado "database".
Dentro do objeto "database", crie um objeto chamado "tables".
Dentro do objeto "tables", crie um objeto com o nome da tabela.
Dentro do objeto criado com o nome da tabela, crie um objeto chamado "columns",
onde as chaves são representadas pelo nome da coluna e o valor pelo tipo.
Dentro do objeto criado com nome da tabela, crie um array chamado "data".
Exiba o conteúdo do objeto "database" utilizando JSON.stringify */
const statement = "create table author (id number, name string, age number, city string, state string, country string)";
const regexp = /create table ([a-z]+) \((.+)\)/;
const parsedStatement = statement.match(regexp);
const tableName = parsedStatement[1];
let columns = parsedStatement[2];
columns = columns.split(", ");
console.log(tableName);
console.log(columns);