const DatabaseError = function(statement, message){
    this.statement = statement;
    this.message = message;
};
const Parser = function() {
    const commands = new Map();
    commands.set("createTable", /create table ([a-z]+) \((.+)\)/);
    commands.set("insert", /insert into ([a-z]+) \((.+)\) values \((.+)\)/);
    commands.set("select", /select (.+) from ([a-z]+)(?: where (.+))?/);
    commands.set("delete", /delete from ([a-z]+)(?: where (.+))?/);
    this.parse = function(statement) {
        for(let [command, regexp] of commands) {
            const parsedStatement = statement.match(regexp);
            if(parsedStatement) {
                return {
                    command, // usando aqui a short range notation oq equivale há command: command,
                    parsedStatement
                }
            }
        }
    };
};
const database = {
    tables: {},
    parser: new Parser(),
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

    },
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
    },
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
    },
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
    },
    execute(statement) {
        const result = this.parser.parse(statement);
        if (result) {
            return this[result.command](result.parsedStatement);
        }
        const message = `Syntax Error "${statement}"`
        throw new DatabaseError(statement, message)
    }
};
try{
    database.execute("create table author (id number, name string, age number, city string, state string, country string)");
    database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
    database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
    database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
    database.execute("delete from author where id = 2");
    console.log(JSON.stringify(database.execute("select name, age from author"), undefined, " "));// O FATO DO AUTHOR TER Q TER ESPAÇO ERA UM ESPAÇO A MAIS NA REGEXP Q QND REMOVIDO QUEBRAVA PORQUE SÓ APÓS REMOVER PODIA POR UM DPS DO ?: SEM QUEBRAR TAMBÉM.
    
} catch(e){
    console.log(e)
}


