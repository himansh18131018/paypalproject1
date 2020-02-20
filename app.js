const fs = require('fs');

const express=require("express");
let app=new express();
const url=require("url")
let login=require("./login")
var bodyParser = require('body-parser');


var courses=[];
var registrations = {
  //key as course id, value []
}


//console.log(course.courses[0])
//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.post('/login', function (req, res, next) {
    const username = req.body.email;
    console.log(req.body.profession);
        let loginResult = login(username, req.body.password);
    if (loginResult) {
            if(req.body.profession=="1")
            {
            res.render('homepage', {name: username});
            }
            else{
                res.render('faculty');
            }
        }
        else {
            res.render('index', {error: true});
        }
    });

app.get('/student',(req,res)=>{
    let regCourses = [];
    let nonReg = [];
    for(i in courses){
        if(registrations[courses[i].course]){
            regCourses.push(courses[i]);
        }else{
            nonReg.push(courses[i])
        }
    }
    console.log(courses);
    res.render("homepage", {regCourses,nonReg});
})

app.post('/course/register',(req,res) => {
    let course = req.body.course;
    registrations[course] = true;
    console.log(registrations);
    res.redirect('/student');
})

app.get('/teacher',(req,res)=>{
    res.render("faculty");
})

app.post('/addcourse',function(req,res){
    let course =req.body.course;
    let teacher = req.body.teacher;
    let branch = req.body.branch;
    let credit = req.body.credit;
    let courseObj = {
        course, teacher, branch, credit
    }
    courses.push(courseObj);
    res.render('faculty',{"msg": "Course added Successfully"});
})

app.get('/', (req, res) => {
	res.render("index",{
        title:'himan'});
});

app.get('/*', (req, res) => {
    res.redirect("/");
})


let port=1234;
app.listen(port,function(){
    console.log("server started listening at localhost"+port);
})