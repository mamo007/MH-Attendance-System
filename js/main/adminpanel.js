// variables
let jsonReports = JSON.parse(localStorage.getItem('jsondata'));

// Check if user is admin

function isUserAdmin(){
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].username == sessionStorage.getItem('loggedusername'))
            if(jsonReports[i].flag == 1)
                return true;
    }
    return false;
}

//main

function callMe(){
    if(isUserAdmin())
    {
        //tables
        showemployee();
        showall();
        showlate();
        showabsent();
        showattendant();
        showverification();
        showaccountverification();
        BanFunc();
        showAllActivityLogsData();

        // recalculate tables
        RecalculateDataTables();
    }
    else
        window.location.href="index.html";
}
callMe();

function showemployee(){
    let createbody = document.createElement('tbody')
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].flag == 0) // prevent showing admin data
        {
            let verify = "", color="text-danger";
            if(jsonReports[i].banned == 1)
                verify = "Banned";
            else if(jsonReports[i].loginconfirm == 1)
            {
                verify = "Verified";
                color="text-success";
            }
            else if(jsonReports[i].loginreject == 1)
                verify = "Rejected"
            else
            {
                verify = "Waiting";
                color="text-info";
            }
            let createtr = document.createElement('tr');
            createtr.innerHTML = `<td>${jsonReports[i].username}</td>
            <td>${jsonReports[i].name}</td>
            <td style='color:${roleCheck(i).split(":")[1]}'>${roleCheck(i).split(":")[0]}</td>
            <td>${jsonReports[i].email}</td>
            <td>${jsonReports[i].address}</td>
            <td>${jsonReports[i].age}</td>
            <td class='${color}'>${verify}</td>`;
            
            createbody.appendChild(createtr);
            document.getElementById('empTable').appendChild(createbody);
        }
    }
}

// this one looks ugly.
function showall(){
    let tableName= ['janTable', 'febTable', 'marchTable', 'aprilTable', 'mayTable', 'juneTable', 'julyTable',
    'augTable', 'septTable', 'octTable', 'novTable', 'decTable'];
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].flag != 1) // prevent admin logs
        {
            let createcard = document.createElement('card');
            createcard.innerHTML = `<div class="card-header" id="cardheader${i}">
            <a class="card-link" data-toggle="collapse" href="#card${i}">${jsonReports[i].username} --- ${jsonReports[i].name}</a>
            </div>
            <div class="collapse" id="card${i}" data-parent="#accordion">
                <div class="card-body">
                    <!-- Table Content will be shown here-->
                    <div class="card text-center">
                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#janreport${i}" data-toggle="tab">January</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#febreport${i}" data-toggle="tab">February</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#marchreport${i}" data-toggle="tab">March</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#aprilreport${i}" data-toggle="tab">April</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#mayreport${i}" data-toggle="tab">May</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#junereport${i}" data-toggle="tab">June</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#julyreport${i}" data-toggle="tab">July</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#augreport${i}" data-toggle="tab">Augest</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#septreport${i}" data-toggle="tab">September</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#octreport${i}" data-toggle="tab">October</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#novreport${i}" data-toggle="tab">November</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#decreport${i}" data-toggle="tab">December</a>
                                </li>
                            </ul>
                        </div> <!-- end of card header -->

                    </div> <!-- end of card -->
                    <div class="card-body tab-content">
                        <div class="tab-pane active" id="janreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="janTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="febreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="febTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="marchreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="marchTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="aprilreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="aprilTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="mayreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="mayTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="junereport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="juneTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="julyreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="julyTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="augreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="augTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="septreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="septTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="octreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="octTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="novreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="novTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="decreport${i}">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center" id="decTable${i}">
                                    <thead>
                                        <tr>
                                            <th>Attendace Day</th>
                                            <th>Attendace Date</th>
                                            <th>Attendace Time</th>
                                            <th>Attendace Late</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>`;
            document.getElementById('accordion').appendChild(createcard);

            for(let j=0; j<12; j++){  
                for(let k=0;k<jsonReports[i].attendance[j].days.length; k++)
                {
                    let createbody = document.createElement('tbody');
                    let createtr = document.createElement('tr');
                    let DateAndTime = jsonReports[i].attendance[j].days[k].time;
                    let Date = DateAndTime.split(" ")[0];
                    let Time = DateAndTime.split(" ")[1];
                    let isLate = "" , color="";
                    if(jsonReports[i].attendance[j].days[k].late == 1)
                    {
                        isLate = "Yes";
                        color="text-danger";
                    }
                    else
                    {
                        isLate = "No";
                        color="text-success";
                    }

                    createtr.innerHTML = `<td>${jsonReports[i].attendance[j].days[k].day}</td>
                    <td>${Date}</td>
                    <td>${Time}</td>
                    <td class='${color}'>${isLate}</td>`;
                    createbody.appendChild(createtr);
                    document.getElementById(tableName[j]+i).appendChild(createbody);
                }
            }
        }
    }
}
function showlate(){
    let createbody = document.createElement('tbody')
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].flag == 0)
        {
            let createtr = document.createElement('tr');
            let totalLate = 0;
            for(let j=0; j<12; j++){
                
                totalLate += jsonReports[i].attendance[j].late;
                createtr.innerHTML = `<td>${jsonReports[i].username}</td>
                <td>${jsonReports[i].name}</td>
                <td>${totalLate}</td>`;
            }
            createbody.appendChild(createtr);
            document.getElementById('lateTable').appendChild(createbody);
        }
    }
}
function showabsent(){
    let createbody = document.createElement('tbody')
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].flag == 0)
        {
            let createtr = document.createElement('tr');
            let totalAbsence = 0;
            for(let j=0; j<12; j++){
                
                totalAbsence += jsonReports[i].attendance[j].absent;
                createtr.innerHTML = `<td>${jsonReports[i].username}</td>
                <td>${jsonReports[i].name}</td>
                <td>${totalAbsence}</td>`;
            }
            createbody.appendChild(createtr);
            document.getElementById('absenceTable').appendChild(createbody);
        }
    }
}

function showattendant(){
    let createbody = document.createElement('tbody')
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].flag == 0)
        {
            let createtr = document.createElement('tr');
            let totalAttendance = 0;
            for(let j=0; j<12; j++){
                
                totalAttendance += jsonReports[i].attendance[j].attend;
                createtr.innerHTML = `<td>${jsonReports[i].username}</td>
                <td>${jsonReports[i].name}</td>
                <td>${totalAttendance}</td>`;
            }
            createbody.appendChild(createtr);
            document.getElementById('attendanceTable').appendChild(createbody);
        }
    }
}

// Verification Part

function roleCheck(i){
    let role="", color="";
    if(jsonReports[i].flag == 1)
    {
        role = 'Admin';
        color = "red";
    }
    else if(jsonReports[i].flag == 0)
    {
        role = 'Employee';
        color = "orange";
    }

    return role + ":" + color;
}

function showverification(){
    let createbody = document.createElement('tbody')
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].loginconfirm == 0 && 
           jsonReports[i].loginreject == 0 && jsonReports[i].banned == 0)
        {
            let createtr = document.createElement('tr');
            createtr.innerHTML = `<td id='empusername${i}'>${jsonReports[i].username}</td>
            <td>${jsonReports[i].name}</td>
            <td style='color:${roleCheck(i).split(":")[1]}'>${roleCheck(i).split(":")[0]}</td>
            <td class='d-flex align-items-center justify-content-around'>
            <input  class='btn btn-success' type='submit' id='verifyBtn${i}' value='Verify' />
            <input class='btn btn-danger' type='submit' id='rejectBtn${i}' value='Reject' />
            </td>`;
            
            createbody.appendChild(createtr);
            document.getElementById('verificationTable').appendChild(createbody);
        }
    }

    isVerifyClick();
    isRejectClick();
    getVerificationCount();
}

function isVerifyClick(){
    for (let i = 0; i < jsonReports.length; i++) 
    {   
        let verifyBtn = document.getElementById('verifyBtn'+i);
        if(verifyBtn != null)
        {
            verifyBtn.addEventListener('click', function(e){
                
                    if(jsonReports[i].loginconfirm == 0 && 
                        jsonReports[i].loginreject == 0 && jsonReports[i].banned == 0)
                    {
                        let getUsernameFromTable = document.getElementById('empusername'+i);
                        if(jsonReports[i].username == getUsernameFromTable.textContent)
                        {
                            jsonReports[i].loginconfirm = 1;
                            jsonReports[i].loginreject = 0;
                            localStorage.setItem('jsondata', JSON.stringify(jsonReports));
                            //getUsernameFromTable.parentElement.remove();
                            window.location.reload();
                        }
                    }
            });
        }
    }
}

function isRejectClick(){
    for (let i = 0; i < jsonReports.length; i++) 
    {   
        let rejectBtn = document.getElementById('rejectBtn'+i);
        if(rejectBtn != null)
        {
            rejectBtn.addEventListener('click', function(e){
                
                if(jsonReports[i].loginconfirm == 0 && 
                    jsonReports[i].loginreject == 0 && jsonReports[i].banned == 0)
                {
                    let getUsernameFromTable = document.getElementById('empusername'+i);
                    if(jsonReports[i].username == getUsernameFromTable.textContent)
                    {
                        jsonReports[i].loginconfirm = 0;
                        jsonReports[i].loginreject = 1;
                        localStorage.setItem('jsondata', JSON.stringify(jsonReports));
                        //getUsernameFromTable.parentElement.remove();
                        window.location.reload();
                    }
                }
            });
        }
    }
}

function getVerificationCount()
{
    let getTable = document.getElementById('verificationTable');

    for(let i=0;i<getTable.children.length;i++)
    {
        if(getTable.children[i].nodeName == "TBODY"){
            document.getElementById('reqNo').textContent = getTable.children[i].childElementCount;
        }
    }
}


function showaccountverification(){
    let createbody = document.createElement('tbody')
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].username != "admin")
        {
            let verifytext = "", color="";
            if(jsonReports[i].loginconfirm == 0 && jsonReports[i].loginreject == 0)
            {
                verifytext = "Waiting";
                color="text-info"
            }
            else if(jsonReports[i].loginconfirm == 1 && jsonReports[i].loginreject == 0)
            {
                verifytext = "Verified";
                color="text-success";
            }
            else if(jsonReports[i].loginconfirm == 0 && jsonReports[i].loginreject == 1)
            {
                verifytext = "Rejected";
                color="text-danger";
            }

            let createtr = document.createElement('tr');
            createtr.innerHTML = `<td id='accusername${i}'>${jsonReports[i].username}</td>
            <td>${jsonReports[i].name}</td>
            <td style='color:${roleCheck(i).split(":")[1]}'>${roleCheck(i).split(":")[0]}</td>
            <td class='d-flex align-items-center justify-content-around'>
            <input  class='btn btn-success' type='submit' id='accverifyBtn${i}' value='Verify' />
            <input class='btn btn-danger' type='submit' id='accrejectBtn${i}' value='Reject' />
            </td><td class='${color}'>${verifytext}</td>`;
            
            createbody.appendChild(createtr);
            document.getElementById('accverificationTable').appendChild(createbody);
        }
    }

    isVerifyClickAccountVerification();
    isRejectClickAccVerification();
}

function isVerifyClickAccountVerification(){
    for (let i = 0; i < jsonReports.length; i++) 
    {   
        let accverifyBtn = document.getElementById('accverifyBtn'+i);
        if(accverifyBtn != null)
        {
            accverifyBtn.addEventListener('click', function(e){
                
                    if(jsonReports[i].username != "admin")
                    {
                        let getUsernameFromTable = document.getElementById('accusername'+i);
                        if(jsonReports[i].username == getUsernameFromTable.textContent)
                        {
                            jsonReports[i].loginconfirm = 1;
                            jsonReports[i].loginreject = 0;
                            localStorage.setItem('jsondata', JSON.stringify(jsonReports));
                            window.location.reload();
                        }
                    }
            });
        }
    }
}

function isRejectClickAccVerification(){
    for (let i = 0; i < jsonReports.length; i++) 
    {   
        let accrejectBtn = document.getElementById('accrejectBtn'+i);
        if(accrejectBtn != null)
        {
            accrejectBtn.addEventListener('click', function(e){
                
                if(jsonReports[i].username != "admin")
                {
                    let getUsernameFromTable = document.getElementById('accusername'+i);
                    if(jsonReports[i].username == getUsernameFromTable.textContent)
                    {
                        jsonReports[i].loginconfirm = 0;
                        jsonReports[i].loginreject = 1;
                        localStorage.setItem('jsondata', JSON.stringify(jsonReports));
                        window.location.reload();
                    }
                }
            });
        }
    }
}

// ban system part

function BanFunc(){
    let createbody = document.createElement('tbody')
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].username != "admin") // prevent showing owner "admin"
        {
            let bantext = "", color="";
            if(jsonReports[i].banned == 1)
            {
                bantext = "Banned";
                color="text-danger"
            }
            else
            {
                bantext = "Not banned";
                color="text-info";
            }

            let createtr = document.createElement('tr');
            createtr.innerHTML = `<td id='banusername${i}'>${jsonReports[i].username}</td>
            <td>${jsonReports[i].name}</td>
            <td style='color:${roleCheck(i).split(":")[1]}'>${roleCheck(i).split(":")[0]}</td>
            <td class='d-flex align-items-center justify-content-around'>
            <input  class='btn btn-danger' type='submit' id='banBtn${i}' value='Ban' />
            <input class='btn btn-dark' type='submit' id='unbanBtn${i}' value='Unban' />
            </td>
            <td class='${color}'>${bantext}</td>`;
            
            createbody.appendChild(createtr);
            document.getElementById('banTable').appendChild(createbody);
        }
    }

    isBanClick();
    isUnbanClick();
}

function isBanClick(){
    for (let i = 0; i < jsonReports.length; i++) 
    {   
        let verifyBtn = document.getElementById('banBtn'+i);
        if(verifyBtn != null)
        {
            verifyBtn.addEventListener('click', function(e){
                
                    if(jsonReports[i].username != "admin")
                    {
                        let getUsernameFromTable = document.getElementById('banusername'+i);
                        if(jsonReports[i].username == getUsernameFromTable.textContent)
                        {
                            jsonReports[i].banned = 1;
                            localStorage.setItem('jsondata', JSON.stringify(jsonReports));
                            window.location.reload();
                        }
                    }
            });
        }
    }
}

function isUnbanClick(){
    for (let i = 0; i < jsonReports.length; i++) 
    {   
        let rejectBtn = document.getElementById('unbanBtn'+i);
        if(rejectBtn != null)
        {
            rejectBtn.addEventListener('click', function(e){
                
                if(jsonReports[i].username != "admin")
                {
                    let getUsernameFromTable = document.getElementById('banusername'+i);
                    if(jsonReports[i].username == getUsernameFromTable.textContent)
                    {
                        if(jsonReports[i].banned == 1) // check if user is banned?
                        {
                            jsonReports[i].banned = 0;
                            jsonReports[i].loginconfirm = 0;
                            jsonReports[i].loginreject = 0;
                            localStorage.setItem('jsondata', JSON.stringify(jsonReports));
                        }
                        window.location.reload();
                    }
                }
            });
        }
    }
}

// Recalculate DataTables after adding our elements.
// Using ajax because of datatable nature. 
function RecalculateDataTables(){
    let arrUser = ['#janTable', '#febTable', '#marchTable', '#aprilTable', '#mayTable', '#juneTable', '#julyTable',
    '#augTable', '#septTable', '#octTable', '#novTable', '#decTable'];
    for (let i = 0; i < jsonReports.length; i++) 
        if(jsonReports[i].flag != 1)
            for(let j=0; j<arrUser.length; j++)
                arrUser[j] = arrUser[j]+i;
    
    let arrTable = ['#empTable', '#lateTable', '#absenceTable',
        '#attendanceTable', '#verificationTable', '#accverificationTable', '#banTable', '#logsTable']
            .concat(arrUser);
    
    for(let i=0; i<arrTable.length; i++)
    {
        let table = $(arrTable[i]).DataTable();
        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function () {
            table.columns.adjust().recalc();
        });
    }
}

function showAllActivityLogsData(){
    let createbody = document.createElement('tbody');
    for (let i = 0; i < jsonReports.length; i++) 
    {
        //for(let j=0; j<jsonReports[i].activitylogs.length; j++){
        for(let j=jsonReports[i].activitylogs.length-1; j>=0; j--){
            let createtr = document.createElement('tr');
            createtr.innerHTML = `<td>${jsonReports[i].username}</td>
            <td style='color:${roleCheck(i).split(":")[1]}'>${roleCheck(i).split(":")[0]}</td>
            <td>${jsonReports[i].activitylogs[j].date}</td>
            <td>${jsonReports[i].activitylogs[j].time}</td>
            <td>${jsonReports[i].activitylogs[j].ip}</td>
            <td>${jsonReports[i].activitylogs[j].location}</td>`;
            createbody.appendChild(createtr);
            document.getElementById('logsTable').appendChild(createbody);
        }
    }
}

// download json file
let downloadLink = document.getElementById('downloadBtn');
function reportDownload(){
    localStorage.getItem('jsondata')
    var _blob = new Blob([JSON.stringify(jsonReports)], {
        type: "application/json"
    });
    downloadLink.href = window.webkitURL.createObjectURL(_blob);
    downloadLink.setAttribute("download", sessionStorage.getItem('loggedusername') + " - FullReport.json");
}

downloadLink.addEventListener('click', function(){
    if(isUserAdmin())
        reportDownload();
});