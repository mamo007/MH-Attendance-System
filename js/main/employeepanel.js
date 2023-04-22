//consts
const loggedusername = sessionStorage.getItem('loggedusername');
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
    showMonthlyData();
    showDailyData();
    if(!isUserAdmin())
        RecalculateDataTables();
}
callMe();

function showMonthlyData(){
    let createbody = document.createElement('tbody');
    let Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 
    'October', 'November', 'December'];
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].username == loggedusername)
        {
            if(jsonReports[i].flag == 1)
            {
                let createtr = document.createElement('tr');
                createtr.innerHTML = `<td colspan='5' class='text-danger'>
                Admins don't have logs.</td>`;
                createbody.appendChild(createtr);
                document.getElementById('monthlyTable').appendChild(createbody);
            }
            else {
                for(let j=0; j<12; j++){
                    let createtr = document.createElement('tr');
                    createtr.innerHTML = `<td>${jsonReports[i].attendance[j].month}</td>
                    <td>${Months[jsonReports[i].attendance[j].month-1]}</td>
                    <td>${jsonReports[i].attendance[j].attend}</td>
                    <td>${jsonReports[i].attendance[j].late}</td>
                    <td>${jsonReports[i].attendance[j].absent}</td>`;
                    createbody.appendChild(createtr);
                    document.getElementById('monthlyTable').appendChild(createbody);
                }
            }
        }
    }
}

function showDailyData(){
    
    let tableName= ['janTable', 'febTable', 'marchTable', 'aprilTable', 'mayTable', 'juneTable', 'julyTable',
     'augTable', 'septTable', 'octTable', 'novTable', 'decTable'];
    for (let i = 0; i < jsonReports.length; i++) 
    {
        if(jsonReports[i].username == loggedusername)
        {
            if(jsonReports[i].flag == 1)
            {
                for(let j=0; j<12; j++){
                    let createbody = document.createElement('tbody');
                    let createtr = document.createElement('tr');
                    createtr.innerHTML = `<td colspan='4' class='text-danger'>
                    Admins don't have logs.</td>`;
                    createbody.appendChild(createtr);
                    document.getElementById(tableName[j]).appendChild(createbody);
                }
            }
            else {
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
                        document.getElementById(tableName[j]).appendChild(createbody);
                    }
                }
            }
        }
    }
}

// Recalculate DataTables after adding our elements.
// Using ajax because of datatable nature. 
function RecalculateDataTables(){
    let arrTable = ['#janTable', '#febTable', '#marchTable', '#aprilTable', '#mayTable', '#juneTable', '#julyTable',
        '#augTable', '#septTable', '#octTable', '#novTable', '#decTable', '#monthlyTable'];
    for(let i=0; i<arrTable.length; i++){
        let table = $(arrTable[i]).DataTable();
        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function () {
                table.columns.adjust().recalc();
        } );
    }
}
