const fs = require('fs');
const qs = require('qs');
const models = require('../models/Models');
const url = require("url");
const Models = new models;
class Controllers {
    home(req,res){
        let html = '';
        fs.readFile('./views/home.html','utf-8', function(err, data){
            let results =  Models.homeDisplay().then(dataBS=>{
                // console.log(dataBS[0]['cityname']);
                dataBS.forEach(value=>{
                    html+=`<tr>`
                    html+=`<td>${value['id']}</td>`
                    html+=`<td><a href="/info-city?id=${value['id']}">${value['cityname']}</a></td>`
                    html+=`<td>${value['Nationnal']}</td>`
                    html+=`<td><a href="/fix-info?id=${value['id']}">fix</a></td>`
                    html+=`<td><a href="/delete-info?id=${value['id']}">delete</a></td>`
                    html+=`</tr>`
                })
                data = data.replace('{list-city}',html);
                res.writeHead(200,'success',{'Content-Type': 'text/html'})
                res.write(data);
                res.end();
            })
        })
    };
    infoCity(req, res){
        let urlQuery = url.parse(req.url,true).query;
        // console.log(urlQuery['id']);

        fs.readFile('./views/info-city.html','utf-8',((err, data) => {
            if(err){
                console.log(err);
            }
            let result = Models.slqInfoCity(urlQuery['id']).then(dataBS => {
                let html = ''

                let cityname='';

                console.log(dataBS);
                dataBS.forEach(value => {
                    cityname = value['cityname']
                    html += `City Name: ${value['cityname']}`
                    html += `Country: ${value['Nationnal']}`
                    html += `Population: ${value['population']}`
                    html += `Area: ${value['area']}`
                    html += `Describecity: ${value['describecity']}`
                })
                console.log(html);
                data = data.replace('{name-city}',cityname)
                data = data.replace('{info-city}',html);
                // console.log(data);
                res.writeHead(200,'success',{'Content-Type': 'text/html'})
                res.write(data);
                res.end();
            })

        }))
    };

    deleteCity(req, res){
        let urlQueryID = url.parse(req.url,true).query.id;
        console.log(urlQueryID.id);
        fs.readFile('./views/home.html', 'utf-8',(err, data) => {
            let result = Models.deleteCity(urlQueryID).then((dataBS) =>{
                res.writeHead(301,'success',{Location: 'http://localhost:3000/home'})
                res.end()
            })
        })
    }
    fixInfo(req,res){
        let urlQuery = url.parse(req.url,true).query['id'];
        if(req.method === 'GET'){

            // console.log(urlQuery);
            fs.readFile('./views/fix-info.html','utf-8',((err, data) => {
                if(err){
                    console.log(err);
                }else{
                    let results =  Models.slqInfoCity(urlQuery).then(dataBS=>{
                        console.log(dataBS[0].id);
                        data = data.replace('<input type="text" name="name">',`<input type="text" name="name" value='${dataBS[0].cityname}'>`)
                        data = data.replace('<input type="text" name="country">',`<input type="text" name="country" value='${dataBS[0].Nationnal}'>`)
                        data = data.replace('<input type="text" name="area">',`<input type="text" name="area" value='${dataBS[0].population}'>`)
                        data = data.replace('<input type="text" name="population">',`<input type="text" name="population" value='${dataBS[0].area}'>`)
                        data = data.replace('<input type="text" name="description">',`<input type="text" name="description" value='${dataBS[0].describecity}'>`);
                        res.writeHead(200,'success',{'Content-Type': 'text/html'});
                        res.write(data);
                        res.end()
                    })
                }
            }))
        }else{
            let data = ''
            req.on('data',chunk =>{
                data+=chunk
            })
            req.on('end',() =>{
                let dataHTML = qs.parse(data);
                Models.fixInfo(dataHTML,urlQuery).then(dataBS=>{
                    res.writeHead(301,{Location:'/home'})
                    res.end();
                })
            })
        }
    };

    create(req, res){
        if(req.method ==='GET'){
            fs.readFile('./views/create.html',"utf-8",(err, data) => {
                if(err){
                    console.log(err);
                }else{
                    res.writeHead(200,'success',{'Content-Type':'text/html'});
                    res.write(data)
                    res.end();
                }
            })
        }else{
            let data = ''
            req.on('data',chunk =>{
                data+=chunk
            })
            req.on('end',() =>{
              let   dataHTML =qs.parse(data)
                Models.createNewCity(dataHTML).then(dataBS=>{
                    res.writeHead(301,{Location:'http://localhost:3000/home'});
                    res.end();
                })
            })
        }
    }
}

module.exports = Controllers;