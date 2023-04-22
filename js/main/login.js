"use strict"

// redirect if there's a session (already logged)

if(sessionStorage.getItem('loggedusername') != null && sessionStorage.getItem('loggedrole') != null)
    window.location.assign("index.html");

// variables

let getUsernameInput = document.getElementById('exampleInputUsername');
let getPasswordInput = document.getElementById('exampleInputPassword');
let setDataInfo = document.getElementById('wrongData');

// remember me check

if(localStorage.getItem('rememberme'))
{
    getUsernameInput.value = JSON.parse(localStorage.getItem('rememberme'));
    document.getElementById('rememberCheck').checked = true;
}

// main

document.getElementById('loginBtn').addEventListener('click', function(e){
    if(getUsernameInput.value.trim() == "") return;
    if(getPasswordInput.value.trim() == "") return;

    e.preventDefault();
    if(localStorage.getItem('jsondata') == null)
    {
        isWrongUserPassText();
    }
    else
    {
        if(checkNamePass())
        {
            if(isUserHaveAccess())
                window.location.href="index.html";


            if(document.getElementById('rememberCheck').checked)
                localStorage.setItem('rememberme', JSON.stringify(getUsernameInput.value));
            else
                localStorage.removeItem('rememberme');
        }
        else{
            isWrongUserPassText();
            return false;
        }
    }
});

function checkNamePass(){
    let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
    for(let i=0;i<jsonContent.length; i++)
        if(jsonContent[i].username == getUsernameInput.value 
        && jsonContent[i].password == md5(getPasswordInput.value))
            return true;

    return false;
}

// Check if user have access
function isUserHaveAccess(){
    let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
    for(let i=0;i<jsonContent.length; i++)
    {
        if(jsonContent[i].username == getUsernameInput.value)
        {
            if(jsonContent[i].banned == 1)
            {
                setDataInfo.innerText= "Your account is BANNED!";
                setDataInfo.style.display = "block";
                return false;
            }

            if(jsonContent[i].loginconfirm == 1)
            {
                sessionStorage.setItem("loggedusername", jsonContent[i].username);
                sessionStorage.setItem("loggedrole", jsonContent[i].flag);
                sessionStorage.setItem("loggedname", jsonContent[i].name);
                setActivityLog();
                return true;
            }
            else if(jsonContent[i].loginreject == 1)
            {
                setDataInfo.innerText= "Your account is REJECTED!";
                setDataInfo.style.display = "block";
                return false;
            }
            else{
                setDataInfo.innerText= "Your account is not verified yet!";
                setDataInfo.style.display = "block";
                return false;
            }
        }
    }

    return false;
}

// record logs in storage
function setActivityLog(){
    let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
    let currTime = new Date().toLocaleString().split(",")[1];
    let currDate = new Date().toLocaleString().split(",")[0];
    let IP="..", Location="..";
    let IPLocation = getIPandLocation();
    
    if(IPLocation != "")
    {
        IP = IPLocation.split(":")[0];
        Location = IPLocation.split(":")[1];
    }

    for (let i = 0; i < jsonContent.length; i++) 
    {
        if(jsonContent[i].username == getUsernameInput.value)
        {
            jsonContent[i].activitylogs.push({
                "date": currDate,
                "time": currTime,
                "ip": IP,
                "location": Location
            });
        }
    }
    localStorage.setItem('jsondata', JSON.stringify(jsonContent));
}

function getIPandLocation() {
    let xmlhttp;
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    if(window.navigator.onLine) // check if there's internet access
    {
        xmlhttp.open("GET","http://www.geoplugin.net/json.gp",false);
        xmlhttp.onerror = function(){
            return "";
        };
        xmlhttp.send();

        let data = JSON.parse(xmlhttp.responseText);

        if(data != null) {
            let IPLocation = data.geoplugin_request + ":" + data.geoplugin_city + ", " + 
            data.geoplugin_regionName + ", " + data.geoplugin_countryName;

            return IPLocation;
        }
    }
    return "";
}

//just to make code looks better.
function isWrongUserPassText(){
    setDataInfo.innerText= "Wrong username or password!";
    setDataInfo.style.display = "block";
    getUsernameInput.value = "";
    getPasswordInput.value = "";
    getUsernameInput.focus();
}

// Admin Creation on startup

function AdminCreation(){
    let creationDate = new Date().toLocaleString();
    if(localStorage.getItem('jsondata') == null)
    {
        let attendance = [];
        for (var i = 1; i <= 12; i++)
          attendance.push({
            "month": i,
            "attend": 0,
            "late": 0,
            "absent": 0,
            "days": []
          });
        let jsonContent = JSON.parse(localStorage.getItem('jsondata')) || [];
        jsonContent.push({
        "name": "Administrator",
        "address": "xyz",
        "email": "MH@ITI.com",
        "age": "25",
        "username": "admin",
        "password": md5("123456"),
        "flag": 1,
        "day" : 0,
        "month" : 0,
        "year" : 0,
        "logtime" : 0,
        "loginconfirm" : 1,
        "loginreject" : 0,
        "banned" : 0,
        "attendance" : attendance,
        "activitylogs" : [],
        "creation" : creationDate
    });

    localStorage.setItem('jsondata', JSON.stringify(jsonContent));
    }
    else{
        
        let isAdminFound = false;
        let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
        for(let i=0; i<jsonContent.length; i++)
        {
            if(jsonContent[i].username == "admin")
                isAdminFound = true;
        }
        if(!isAdminFound)
        {
            let attendance = [];
            for (var i = 1; i <= 12; i++)
              attendance.push({
                "month": i,
                "attend": 0,
                "late": 0,
                "absent": 0,
                "days": []
              });
            jsonContent.push({
                "name": "Administrator",
                "address": "xyz",
                "email": "MH@ITI.com",
                "age": "25",
                "username": "admin",
                "password": md5("123456"),
                "flag": 1,
                "day" : 0,
                "month" : 0,
                "year" : 0,
                "logtime" : 0,
                "loginconfirm" : 1,
                "loginreject" : 0,
                "banned" : 0,
                "attendance" : attendance,
                "activitylogs" : [],
                "creation" : creationDate
            });
            localStorage.setItem('jsondata', JSON.stringify(jsonContent));
        }
    }
}

//Username = admin, Password = 123456
AdminCreation();