//consts

const loggedusername = sessionStorage.getItem('loggedusername');

// main

function callMe(){
    showUserData();
    showActivityLogsData();
    RecalculateDataTables();
}

let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
callMe();

function showUserData(){
    let createbody = document.createElement('tbody');
    for (let i = 0; i < jsonContent.length; i++) 
    {
        if(jsonContent[i].username == loggedusername)
        {
            // let role = ""
            // if(jsonContent[i].flag == 1)
            // {
            //     role = "Admin";
            //     document.getElementById('roleInput').style.color = "red";
            // }
            // else
            // {
            //     role = "Employee";
            //     document.getElementById('roleInput').style.color = "orange";
            // }

            document.getElementById('usernameInput').value = jsonContent[i].username;
            document.getElementById('nameInput').value = jsonContent[i].name;
            //document.getElementById('roleInput').value = role;
            document.getElementById('emailInput').value = jsonContent[i].email;
            document.getElementById('addressInput').value = jsonContent[i].address;
            document.getElementById('ageInput').value = jsonContent[i].age;
            document.getElementById('creationInput').value = jsonContent[i].creation;
        }
    }
}

function setNewPassword(e){
    let useroldpass = document.getElementById('useroldpassInput').value;
    let usernewpass = document.getElementById('usernewpassInput').value;
    let usernewpass2 = document.getElementById('usernewpassInput2').value;
    let plainMsg = document.getElementById('wrongData');

    if(useroldpass.trim() == "") return;
    if(usernewpass.trim() == "") return;
    if(usernewpass2.trim() == "") return;

    e.preventDefault();

    for (let i = 0; i < jsonContent.length; i++) 
    {
        if(jsonContent[i].username == loggedusername)
        {
            if(md5(useroldpass) == jsonContent[i].password)
            {
                if(usernewpass == usernewpass2)
                {
                    if(usernewpass != useroldpass)
                    {
                        jsonContent[i].password = md5(usernewpass);
                        plainMsg.classList.remove('text-danger');
                        plainMsg.classList.add('text-success');
                        plainMsg.innerText = "You successfully changed your password!";
                        localStorage.setItem('jsondata', JSON.stringify(jsonContent));
                        document.getElementById('changePassBtn').disabled = true;
                        sendEmail(jsonContent[i].email, usernewpass)
                    }
                    else{
                        plainMsg.innerText = "New password cannot be same as old password!";
                    }
                }
                else{
                    plainMsg.innerText = "New password and confirmation password aren't the same!";
                }
            }
            else{
                plainMsg.innerText = "Your password is wrong!";
            }
        }
    }
}

document.getElementById('changePassBtn').addEventListener('click', function(e){
    setNewPassword(e);
});

function sendEmail(email, password) {
    Email.send({
    Host: "smtp.elasticemail.com",
    Username:"mhattendancesysiti2023@gmail.com",
    Password: "0EA5A5E0F5C169EB7870CF949BCD79E8EB6C",
    To: email,
    From: "mhattendancesysiti2023@gmail.com",
    Subject: "MH - Password Changed",
    Body: `Your password was recently changed to: ${password} Regards, MH - Admin!`,
})
.then(function (message) {
    //alert(message);
    
    // To make sure the email was sent!
    setTimeout(() => window.location.href="profile.html", 3000);
}); 
}

function showActivityLogsData(){
    let createbody = document.createElement('tbody');
    for (let i = 0; i < jsonContent.length; i++) 
    {
        if(jsonContent[i].username == loggedusername)
        {
            //for(let j=0; j<jsonContent[i].activitylogs.length; j++){
            for(let j=jsonContent[i].activitylogs.length-1; j>=0; j--){
                let createtr = document.createElement('tr');
                createtr.innerHTML = `<td>${jsonContent[i].username}</td>
                <td>${jsonContent[i].activitylogs[j].date}</td>
                <td>${jsonContent[i].activitylogs[j].time}</td>
                <td>${jsonContent[i].activitylogs[j].ip}</td>
                <td>${jsonContent[i].activitylogs[j].location}</td>`;
                createbody.appendChild(createtr);
                document.getElementById('logsTable').appendChild(createbody);
            }
        }
    }
}

// Recalculate DataTables after adding our elements.
// Using ajax because of datatable nature. 
function RecalculateDataTables(){
    let arrTable = ["#logsTable"];
    for(let i=0; i<arrTable.length; i++){
        let table = $(arrTable[i]).DataTable();
        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function () {
                table.columns.adjust().recalc();
        } );
    }
}