/* import {Parser} from "./parser"; */
/* import {DatabaseError} from "./databaseError" // poderia usar só DatabaseError desde q colocasse export default no outro arquivo  */
/* export */ class Database {
    constructor() {
    this.tables = {};
    this.parser = new Parser();
    }
    createTable(parsedStatement) {
        let [,tableName, columns] = parsedStatement;
        this.tables[tableName]={
            columns:{},
            data: []
        };
        columns = columns.split(", ");
        for (let column of columns){
            column = column.split(" ");/*  poderia caso não tivesse posto split lá em columns com ", " e sim só a ",", só passar column.trim.split(" ") q daria certo */
            const [name, type] = column;
            this.tables[tableName].columns[name] = type;
        }

    }
    insert(parsedStatement){
        let [, tableName, columns, values] = parsedStatement;
        columns = columns.split(", ");
        values = values.split(", ");
        let row = {};
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const value = values[i];
            row[column] = value;
        }
        this.tables[tableName].data.push(row)
    }
    select(parsedStatement){
        let [, columns, tableName, whereClause] = parsedStatement //já criando direto com destructurings
        columns = columns.split(", ");
        let rows = this.tables[tableName].data
        if (whereClause) {
        const [columnWhere, valueWhere] = whereClause.split(" = ")
        rows = rows.filter(function(row){
            return row[columnWhere] === valueWhere;
        });
        }
        rows = rows.map(function (row){
            let selectedRow = {};
            columns.forEach(function (column) {
                selectedRow[column] = row[column];
            })
            return selectedRow;
        })
        return rows;
    }
    delete(parsedStatement){
        let [, tableName, whereClause] = parsedStatement;
        if (whereClause) {
        let [columnWhere, valueWhere] = whereClause.split(" = ");
        this.tables[tableName].data = this.tables[tableName].data.filter(function(row){
            return row[columnWhere] !== valueWhere;
        });
        } else {
        this.tables[tableName].data = [];
        }
    }
    execute(statement) {
        setTimeout(function() {
            const result = this.parser.parse(statement);
        if (result) {
            return this[result.command](result.parsedStatement);
        }
        const message = `Syntax Error: "${statement}"`
        throw new DatabaseError(statement, message)
        }, 1000);
    }