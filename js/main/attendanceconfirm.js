"use strict"

// consts
const attendedBefore = document.getElementById('attendedBefore');
const loggedusername = sessionStorage.getItem('loggedusername');

// default

attendedBefore.style.display = "none";

// main

document.getElementById('usernameInput').value = loggedusername;

document.getElementById('confirmBtn').addEventListener('click', function() {

    if(isUserAdmin())
    {
        attendedBefore.innerText = "Admins cannot submit in attendance confirmation!";
        attendedBefore.style.display = "block";
    }
    else if(isWorkTime())
    {
        if(!isConfirmed())
        {
            updateUserData();
        }
        else
        {
            attendedBefore.innerText = "You already attended today!";
            attendedBefore.style.display = "block";
        }
    }
    else
    {
        attendedBefore.innerText = "Working time is 8:30AM to 3:30PM !";
        attendedBefore.style.display = "block";
    }
});

function updateUserData(){
    let currTime = new Date().getHours() + ":" + new Date().getMinutes();
    sessionStorage.setItem('attendancetime', currTime);
    let splitTime = currTime.split(":");

    let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
    for(let i=0;i<jsonContent.length; i++)
    {
        if(jsonContent[i].username == loggedusername)
        {
            jsonContent[i].logtime = currTime;
            jsonContent[i].day = new Date().getDate();
            jsonContent[i].month = (new Date().getMonth() + 1);
            jsonContent[i].year = new Date().getFullYear();
            let DateAndTime = jsonContent[i].day+"/"+jsonContent[i].month+"/"+jsonContent[i].year+
                " "+currTime;
            if(splitTime[0] == 8 && (splitTime[1] >= 0 && splitTime[1] <= 30))
            {
                jsonContent[i].attendance[jsonContent[i].month-1].attend += 1;
                jsonContent[i].attendance[new Date().getMonth()].days.push({
                    "day": new Date().getDate(),
                    "time": DateAndTime,
                    "late": 0,
                });
            }
            else //if(splitTime[0] == 8 && (splitTime[1] > 30 && splitTime[1] <= 59))
            {
                jsonContent[i].attendance[new Date().getMonth()].attend += 1;
                jsonContent[i].attendance[new Date().getMonth()].late += 1;
                jsonContent[i].attendance[new Date().getMonth()].days.push({
                    "day": new Date().getDate(),
                    "time": DateAndTime,
                    "late": 1,
                });
            }
            //else
                //jsonContent[i].attendanceNo += 1;

            attendedBefore.innerText = "You successfully confirmed attendance!";
            attendedBefore.classList.remove('text-danger');
            attendedBefore.classList.add('text-success');
            attendedBefore.style.display = "block";
        }
    }
    localStorage.setItem('jsondata', JSON.stringify(jsonContent));
}

// Check if user already confirmed today or not.
function isConfirmed(){
    let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
    for(let i=0;i<jsonContent.length; i++)
    {
        if(jsonContent[i].username == loggedusername)
            if(jsonContent[i].day  == new Date().getDate() && jsonContent[i].month == (new Date().getMonth() + 1) 
                && jsonContent[i].year == new Date().getFullYear())
                return true;
    }
    return false;
}

function isWorkTime(){
    let startTime = '8:30:00';
    let endTime = '15:30:00';

    let currentDate = new Date()   

    let startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);

    let endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);

    return startDate < currentDate && endDate > currentDate
}

// Check if user is admin
function isUserAdmin(){
    let jsondata = JSON.parse(localStorage.getItem('jsondata'));
    for (let i = 0; i < jsondata.length; i++) 
    {
        if(jsondata[i].username == sessionStorage.getItem('loggedusername'))
            if(jsondata[i].flag == 1)
                return true;
    }
    return false;
}
