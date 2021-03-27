const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "eveyhily6",
    database: "employee_db"
})

connection.connect(err => {
    if(err) throw err;
    beginning()
})

//view all, add one to all, update one employee
function beginning () {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Departments", "View Roles", "View Employees", "Add Departments", "Add Roles", "Add Employees", "Update Employee Role", "Nothing"],
            message: "What would you like to do?",
            name: "choice"
        }
    ]).then(choiceRes => {
        if(choiceRes.choice == "View Departments"){
            deptView()
        } else if (choiceRes.choice == "View Roles"){
            roleView()
        } else if (choiceRes.choice == "View Employees"){
            employeeView()
        }else if(choiceRes.choice == "Add Departments"){
            deptAdd()
        } else if (choiceRes.choice == "Add Roles"){
            roleAdd()
        } else if (choiceRes.choice == "Add Employees"){
            employeeAdd()
        } else if (choiceRes.choice == "Update Employee Role"){
            employeeUpdate()
        } else {
            console.log("Have a good day!")
        }
    })
}

//view departments
function deptView () {
    let queryString = `
    SELECT *
    FROM department`;
    
    connection.query(queryString, (err, data) => {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        beginning()
    })
}

function roleView(){
    let queryString = `
    SELECT *
    FROM role`;

    connection.query(queryString, (err, data) => {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        beginning()
    })
}

function employeeView(){
    let queryString = `
    SELECT *
    FROM employee`;

    connection.query(queryString, (err,data) => {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        beginning()
    })
}


async function deptAdd(){
    let response = await inquirer.prompt([
        {
            message: "what is your department name?",
            name: "dept"
        }
    ]) 
    console.log(response)
    let queryString = `
    INSERT INTO department values(0,'${response.dept}')`;

    connection.query(queryString, (err,data) => {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        beginning()
    })
}


async function roleAdd(){
    let response = await inquirer.prompt([
        {
            message: "what is the role title?",
            name: "title"
        },
        {
            message:"what is the salary?",
            name:"salary"
        },
        {
            message:"what is the department id?",
            name:"id"
        }
    ]) 
    console.log(response)
    let queryString = `
    INSERT INTO role values(0,'${response.title}','${response.salary}','${response.id}')`;

    connection.query(queryString, (err,data) => {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        beginning()
    })
}

async function employeeAdd(){
    let response = await inquirer.prompt([
        {
            message: "what is your first name?",
            name: "first_name"
        },
        {
            message:"what is your last name?",
            name:"last_name"
        },
        {
            message:"what is your role id?",
            name:"id"
        }
    ]) 
    console.log(response)
    let queryString = `
    INSERT INTO employee values(0,'${response.first_name}','${response.last_name}','${response.id}')`;

    connection.query(queryString, (err,data) => {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        beginning()
    })
}


async function employeeUpdate(){
    let response = await inquirer.prompt([
        {
            message: "what is employee id?",
            name: "employee_id"
        },
        {
            message:"what is the new role id?",
            name:"role_id"
        }
    
    ]) 
    console.log(response)
    let queryString = `
    UPDATE employee SET role_id = '${response.role_id}' WHERE id = '${response.employee_id}'`

    connection.query(queryString, (err,data) => {
        if (err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        beginning()
    })
}