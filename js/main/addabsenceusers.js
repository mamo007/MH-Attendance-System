function isAbsentTime(){
    let startTime = '15:30:01';
    let endTime = '23:59:59';

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

// Check if all users already confirmed today or not except admins.
function isConfirmedAllUsers(){
    let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
    let arr=[];
    for(let i=0;i<jsonContent.length; i++)
    {
        if(jsonContent[i].flag != 1 && jsonContent[i].loginconfirm == 1 && jsonContent[i].loginreject == 0 &&
            jsonContent[i].banned == 0)
        {
            if(jsonContent[i].day  == new Date().getDate() && jsonContent[i].month == (new Date().getMonth() + 1) 
                && jsonContent[i].year == new Date().getFullYear())
                    arr +=0 + ",";
            else
                arr +=1 + ",";
        }
    }
    return arr;
}

function addAbsenceToEmployee(){
    
    let jsonContent = JSON.parse(localStorage.getItem('jsondata'));
    let bTemp = false;


    if(isAbsentTime() && !bTemp)
    {
        for(let i=0;i<jsonContent.length; i++)
        {
            if(jsonContent[i].flag != 1 && jsonContent[i].loginconfirm == 1 && jsonContent[i].loginreject == 0 &&
                jsonContent[i].banned == 0)
            {
                for(let j=0; j< isConfirmedAllUsers().split(",").length-1; j++)
                {
                    if(isConfirmedAllUsers().split(",")[j] == 0)
                        bTemp = true;
                    else if(isConfirmedAllUsers().split(",")[j] == 1)
                        bTemp = false;
                }
                
                jsonContent[i].day = new Date().getDate();
                jsonContent[i].month = (new Date().getMonth() + 1);
                jsonContent[i].year = new Date().getFullYear();

                jsonContent[i].attendance[new Date().getMonth()].absent += 1;
            }
        }
        localStorage.setItem('jsondata', JSON.stringify(jsonContent));
    }
}

// run every minute
setInterval(addAbsenceToEmployee, 1000*60);