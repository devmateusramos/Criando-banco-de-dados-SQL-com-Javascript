const DatabaseError = function(statement, message){
    this.statement = statement;
    this.message = message;
};

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
    insert(statement){
        
    },
    execute(statement) {
        if (statement.startsWith("create table")) {
        return this.createTable(statement);
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
    console.log(JSON.stringify(database, undefined, " "));
    
} catch(e){
    console.log(e)
}

