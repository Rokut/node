const express = require('express');
const app = express(); // musu aplikacija stoves ant express framework
app.use(express.json());


app.get('/', (req, res)=>{ //kadangi metodas, rasom i vidu skliaustu. req , res - uzklausa ir response
    res.send('kas matysis body narsykleje'); //kvieciam fnkcija send, reiskia kas matysis body
});

app.get('/allsalys', (req, res)=>{  //kitas puslapis, http://localhost:3000/allsalys
    res.send('all countries'); //kas matosi body
});

// app.get('/api/courses/:id', (req, res)=> { //tikimasi kad ateis id is front'o. pvz idesim i id - prekes id. http://localhost:3000/api/courses/3
//     res.send(req.params.id); //Tada node paims req.params.id
// })

app.get('/api/post/:year/:month', (req, res)=> { //http://localhost:3000/api/post/2012/12
    res.send(req.params);
})


// tarkim duomenys is DB 
const courses = [
    {id: 1, name: 'js'},
    {id: 2, name: 'react'},
    {id: 3, name: 'node js'}
]
// //uzklausos apie kursus is auksciau lenteles gavimas, atvaizdavimas
// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// })

//uzklausos apie kursus gavimas, pagal konkretu ID is lenteles courses auksciau
app.get('/api/courses/:id', (req, res) => {
    const my_course = courses.find(course => course.id === parseInt(req.params.id));
    if(!my_course) res.status(404).send('not found');
    res.send(my_course);
})


//naujo kurso idejimas i courses (POST metodas)
app.post('/api/courses', (req, res) => { //POST metodas
    const course = {
        id: courses.length + 1, //prie paskutinio ID prides viena
        name: req.body.name //gausim nauja name reiksme, kai bus ivesta is front puses {"dailusis_ciuozimas"} (body>json content)
    };
    courses.push(course);
    res.send(course);
});


//atnaujinti vieno course reiksme
// kai bus ivesta is front puses http://localhost:3000/api/courses/2 "saudymas" (body>json content)
app.put('/api/courses/:id', (req, res) => {
    const my_course = courses.find(course => course.id === parseInt(req.params.id));
    if(!my_course) return res.status(404).send('not found');
    my_course.name = req.body.name;
    res.send(my_course);
});


//istrinti viena elementa is courses
app.delete('/api/courses/:id', (req, res) => {
    //paimti ID is courses
    //jeigu nera tokio grazina klaida
    const my_course = courses.find(course => course.id === parseInt(req.params.id));
    if(!my_course) return res.status(404).send('not found');

    //istrinimas jeigu randa pagal ID
    const index = courses.indexOf(my_course);
    courses.splice(index, 1); //istrina pirma elementa
    res.send(my_course);
});

app.listen(3000, ()=>{  // kad siusti  gauti req-res, reikia pakurt serveri
    console.log('jeigu matom terminale, reiskias serveris veikia')  //kad matytume ar serveris veikia
});


