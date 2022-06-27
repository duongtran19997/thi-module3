const Database = require('./Database')

class Models {

    constructor() {
        this.conn = Database.connect()
    }

    homeDisplay() {
        return new Promise(function (resolve, reject) {
            let sql = 'SELECT id,cityname,Nationnal FROM City';
            Database.connect().query(sql, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        });
    }

    slqInfoCity(id) {
        let sql = `select * from City where id = ${id}`;
        return new Promise((resolve, reject) => {
            Database.connect().query(sql, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    };
    deleteCity(urlQueryID){
        return new Promise((resolve, reject) => {
            let sql = `delete from city where id = ${urlQueryID};`;
            Database.connect().query(sql, (err, data) => {
                if (err) {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    };
    fixInfo(data){
        console.log(data)
        return new Promise((resolve, reject) => {
            let sql = ``
            }
        )
    }

    
}

module.exports = Models;