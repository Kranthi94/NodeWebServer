const hbs = require('hbs');

const express =  require('express');

const fs = require('fs');

const port = process.env.PORT || 8000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next) => {

    var now = new Date().toString();

    var log = `${now} + ${req.method} + ${req.url}`;

    fs.appendFile('./playground/server.log', log + '\n', (error) => {
        if(error){
          console.log(error);
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
    console.log('Capitalize');
    return text;
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
      pageTitle : 'home'
  });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'about section'
    });
});

app.get('/projects', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'projects section'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
