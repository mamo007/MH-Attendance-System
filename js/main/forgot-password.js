"use strict"

// variables

let InputEmail = document.getElementById('exampleInputEmail');

// default

document.getElementById('wrongData').style.display = "none";

// main

document.getElementById('forgotBtn').addEventListener('click', function(e){
    if(InputEmail.value.trim() == "") return;

    if(localStorage.getItem('jsondata') != null)
    {
        if(checkEmailExist())
        {
            //alert('Password resetted successfully! Check your email!');
            getDataFromForm(); 
            sendEmail();
        }
        else{
            //alert('The email does not exist!');
            document.getElementById('wrongData').innerText = "The email does not exist!"
            document.getElementById('wrongData').style.display = "block";
        }
    }
    else
    {
        //alert('The email does not exist!');
        document.getElementById('wrongData').innerText = "The email does not exist!"
        document.getElementById('wrongData').style.display = "block";
    }

    if(localStorage.getItem('jsondata') == null || !checkEmailExist())
    {
        e.preventDefault();
        InputEmail.value = "";
        InputEmail.focus();
        return false;
    }
});

var email, password, jsonContent=[];

function checkEmailExist(){
    return localStorage.getItem('jsondata').includes(InputEmail.value);
}

function generatePassword() {
    let password = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@#$&";
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(
        Math.floor(Math.random() * characters.length)
        );
    }
    return password;
};

function sendData(){
    jsonContent = JSON.parse(localStorage.getItem('jsondata'));

    for(let i=0;i<jsonContent.length; i++)
        if(jsonContent[i].email == InputEmail.value)
            jsonContent[i].password = md5(password);

    localStorage.setItem('jsondata', JSON.stringify(jsonContent));
}

function getDataFromForm(){
    email = InputEmail.value;
    password = generatePassword();
    sendData();
}

async function sendEmail() {
    await Email.send({
        Host: "smtp.elasticemail.com",
        Username:"mhattendancesysiti2023@gmail.com",
        Password: "0EA5A5E0F5C169EB7870CF949BCD79E8EB6C",
        To: email,
        From: "mhattendancesysiti2023@gmail.com",
        Subject: "MH - Password Resetted",
        Body: `You successfully resetted your password!
        Your new password: ${password}`,
    })
    .then(function (message) {
    alert(message);
    
    }); 
}