"use strict"

// redirect if there's a session (already logged)

if(sessionStorage.getItem('loggedusername') != null && sessionStorage.getItem('loggedrole') != null)
    window.location.assign("index.html");

// variables
let textData = document.getElementById('wrongData');

// default

document.getElementById('adminusertype').checked = true;
textData.style.display = "none";

// main

document.getElementById('registerBtn').addEventListener('click', function(e){
    if(document.getElementById('exampleFirstName').value.trim() == "") return;
    if(document.getElementById('exampleLastName').value.trim() == "") return;
    if(document.getElementById('exampleInputAddress').value.trim() == "") return;
    if(document.getElementById('exampleInputEmail').value.trim() == "") return;
    let age = document.getElementById('exampleInputAge').value;
    if(age.trim() == "" || age < 10 || age > 70) return;

    e.preventDefault();
    if(localStorage.getItem('jsondata') == null)
    {
        getDataFromForm(); 
        SuccessRegisteration();
        sendEmail();
    }
    else
    {
        if(!checkUniqueEmail())
        {
            getDataFromForm(); 
            SuccessRegisteration();
            sendEmail();
        }
        else{
            
            FailedRegisteration();
            return false;
        }
    }
});

let name, address, email, age, username, password, flag, jsonContent=[];

function checkUniqueEmail(){
    return localStorage.getItem('jsondata').includes(document.getElementById('exampleInputEmail').value);
}

function generatePassword() {
    let password = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@#$&";
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(
        Math.floor(Math.random() * characters.length)
        );
    }
    return password;
};

function sendData(){
    let creationDate = new Date().toLocaleString();
    let attendance = [];
    for (var i = 1; i <= 12; i++)
      attendance.push({
        "month": i,
        "attend": 0,
        "late": 0,
        "absent": 0,
        "days": []
      });

    jsonContent = JSON.parse(localStorage.getItem('jsondata')) || [];
        jsonContent.push({
        "name": name,
        "address": address,
        "email": email,
        "age": age,
        "username": username,
        "password": md5(password),
        "flag": flag,
        "day" : 0,
        "month" : 0,
        "year" : 0,
        "logtime" : 0,
        "loginconfirm" : 0,
        "loginreject" : 0,
        "banned" : 0,
        "attendance" : attendance,
        "activitylogs" : [],
        "creation": creationDate
    });

    localStorage.setItem('jsondata', JSON.stringify(jsonContent));
}

function getDataFromForm(){
    name = document.getElementById('exampleFirstName').value + " " + document.getElementById('exampleLastName').value;
    address = document.getElementById('exampleInputAddress').value;
    email = document.getElementById('exampleInputEmail').value;
    age = document.getElementById('exampleInputAge').value;
    username = "MH-" + name.slice(0,3) + Math.ceil(Math.random() * 100000) + "iti";
    password = generatePassword();
    document.getElementById("empusertype").checked ? flag=0 : flag=1;
    sendData();
}

function sendEmail() {
        Email.send({
        Host: "smtp.elasticemail.com",
        Username:"mhattendancesysiti2023@gmail.com",
        Password: "0EA5A5E0F5C169EB7870CF949BCD79E8EB6C",
        To: email,
        From: "mhattendancesysiti2023@gmail.com",
        Subject: "MH - Verification Email",
        Body: `Welcome To MH - Attendance System!
        Your 
        Username: ${username}
        Password: ${password}`,
    })
    .then(function (message) {
        //alert(message);
        
        // To make sure the email was sent!
        setTimeout(() => window.location.href="login.html", 3000);
    }); 
}

// Just to make code looks better.
function SuccessRegisteration(){
    textData.classList.remove('text-danger');
    textData.classList.add('text-success');
    textData.innerHTML = "Redirecting..";
    textData.style.display = "block";
    document.getElementById('registerBtn').disabled = true;
}

function FailedRegisteration(){
    textData.innerHTML = "The email already exists!";
    textData.style.display = "block";
    document.getElementById('exampleInputEmail').focus();
}