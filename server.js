const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err){
        console.log(err);
        };
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance');
// });

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Carla',
    //     likes: [ 
    //         'Bikes',
    //         'Cities' 
    //     ] 
    // });
    res.render('home', {
            pageTitle: 'Home sweet home page',
            welcomeMessage: 'Hello Welcome to my Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
            pageTitle: 'About newly page',
            currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(3000, ()=> {
    console.log('Listening on 3000');
});