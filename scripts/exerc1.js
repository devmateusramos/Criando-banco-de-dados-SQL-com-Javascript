// Objetivo é extrair parte da tabela e as colunas, armazenando-as em variáveis
const statement = "create table author (id number, name string, age number, city string, state string, country string)";
const regexp = /create table author/;
const parsedStatement = statement.match(regexp);
console.log(parsedStatement);

