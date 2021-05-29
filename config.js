class Database{
    constructor(){
        this.host = 'localhost';
        this.server = 'postgres';
        this.user = 'postgres';
        this.pass = '1234';
        this.port = '5432';
        this.database = 'express_login_and_registration';
    }
}
module.exports = new Database;