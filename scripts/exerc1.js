// Objetivo é extrair parte da tabela e as colunas, armazenando-as em variáveis
const statement = "create table author (id number, name string, age number, city string, state string, country string)";
const regexp = /create table ([\w]+) \((.+)\)/;
const parsedStatement = statement.match(regexp);
const tableName = parsedStatement[1];
let columns = parsedStatement[2];
columns = columns.split(", ");
console.log(parsedStatement);
console.log(tableName);
console.log(columns);

