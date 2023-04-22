// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart
var ctx = document.getElementById("myPieChart");
var jsondata = JSON.parse(localStorage.getItem('jsondata'));
var totalAttendance = 0, totalAbsence = 0, totalLate = 0, Total = 0;
for (let i = 0; i < jsondata.length; i++) 
    if(jsondata[i].flag == 0)
        for(let j=0; j<12; j++)
        {
            totalAttendance += jsondata[i].attendance[j].attend;
            totalAbsence += jsondata[i].attendance[j].absent;
            totalLate += jsondata[i].attendance[j].late;
        }

Total = totalAttendance + totalAbsence + totalLate;
totalAttendance = Math.round((totalAttendance/Total)*100);
totalAbsence = Math.round((totalAbsence/Total)*100);
totalLate = Math.round((totalLate/Total)*100);

var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Attendance", "Absence", "Late"],
      datasets: [{
        data: [totalAttendance, totalAbsence, totalLate],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
