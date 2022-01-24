const inquirer = require('inquirer');
const mysql = require('mysql2');
//const config = require('./config/config')
const prompt = (questions) => inquirer.prompt(questions)

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'cesarin2001',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);


db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  doMore = () => {
    prompt({
        name: "continue",
    type: "list",
    choices: ['Yes','No'],
    message: "Would you like to continue?"
    }).then(data => {
        if(data.continue === 'Yes'){
            menu()
        } else {
            console.log('Goodbye')
            process.exit()
        }
    })
}

menu = () => {
prompt([{
    name: "mainMenu",
    type: "list",
    choices: ['View all departments','View all roles','View all employees','Add a department','Add a role','Add an employee','update an employee role'],
    message: "What would you like to do?"
}]).then(data=>{
    if(data.mainMenu === 'View all departments'){
        db.connect(function(err){
            if (err) throw err;
            db.query('select * from department', function (err, result) {
    if (err) throw err;
    console.table(result);
    doMore()
  });
})
}
 if(data.mainMenu === 'View all roles'){
        db.connect(function(err){
            if (err) throw err;
            db.query('select * from role', function (err, result) {
    if (err) throw err;
    console.table(result);
    doMore()
  });
})
}
 if(data.mainMenu === 'View all employees'){
        db.connect(function(err){
            if (err) throw err;
            db.query('select * from employee', function (err, result) {
    if (err) throw err;
    console.table(result);
    doMore()
  });
})
}
 if(data.mainMenu === 'Add a department'){
     prompt({
    name: "name",
    type: "input",
    message: "What is the name of the department you would like to add?"
     }).then(response=>{
        db.connect(function(err){
            if (err) throw err;
            db.query(`insert into department (name) values('${response.name}');`, function (err, result) {
    if (err) throw err;
    console.log('Success!');
    doMore()
  });
})
})
    }
 if(data.mainMenu === 'Add a role'){
     db.connect(function(err){
            if (err) throw err;
            db.query('select * from department', function (err, result) {
    if (err) throw err;
    console.table(result);
  });
})
     prompt([
     {
    name: "department_id",
    type: "input",
    message: "What is the department_id for the department this role belongs to?"
     },
         {
    name: "title",
    type: "input",
    message: "What role you would like to add?"
     },
     {
    name: "salary",
    type: "input",
    message: "What is the yearly salary for this role?"
     },
     ]).then(response=>{
        db.connect(function(err){
            if (err) throw err;
            db.query(`insert into role (title, salary, department_id) values('${response.title}', '${response.salary}', '${response.department_id}');`, function (err, result) {
    if (err) throw err;
    console.log('Success!');
    doMore()
  });
})
})
    }
 if(data.mainMenu === 'Add an employee'){
     prompt([{
    name: "name",
    type: "input",
    message: "What is the name of the department you would like to add?"
     },
     ]).then(response=>{
        db.connect(function(err){
            if (err) throw err;
            db.query(`insert into department (first_name, last_name, role_id, manager_id) values('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}');`, function (err, result) {
    if (err) throw err;
    console.log('Success!');
    doMore()
  });
})
})
    }
 })
}
menu()