# MH - Attendance System

## DESCRIPTION
 MH - Attendance System is a client-side project for taking employees attendance, showing their attendance in employee reports page, and showing all reports to the admin/s.
 The project is mainly made for ITI (Client-Side project). <3

## FEATURES
  - Friendly Theme.
  - Data are stored in JSON format in localstorage and can be downloaded from admin panel.
  - Saved passwords are hashed using MD5.
  - Full responsive pages using bootstrap.
  - Tracking all employee's activities from admin panel.
  - Tracking Logs on login with location and ip (requires internet access).
  - You can verify or reject current and new employees.
  - Ban System.
  - Verification Control System.
  - Auto detected absent employees.
  - Handling authentications and authorizations of accessing pages (using sessionStorage).
  - All validations are considered using javascript.
  - Auto detect all absent employees after the specified work time.
  - All reports are organized using DataTables.
  
  ## Pages
  
  #### Register and Login
  - There's two types of registered accounts (Employees and admins).
  - When you register, The system will send a message to your email containing your username/password.
  - You won't be able to login until the admin/s accept your request.
  
  #### Forgot Password
  You will get a message containing the new password to the entered email if the email is found in the localstorage.
  
  #### Dashboard
  - It's just a welcome message.
  
  #### Admin Panel
  This is the most interesting part in the system since it contains:
  - Overviews: Shows an overview of all attendance/absence/late using three different graphs (Chart/Bar/Pie Areas).
  - All Employees: Shows all current accepted employees data.
  - Full Reports: Shows the full report of each employee in the current year in a well organized way for each.
  - Late Reports: Shows the late reports of each employee in total.
  - Absence Reports: Shows the absence reports of each employee in total.
  - Attendance Reports: Shows the attendance reports of each employee in total.
  - Verification Requests: Shows the employee/s, admin/s who are waiting to be accepted to use the system with a counter of current requests.
  - Verification Control: Let you verify or reject the whole system accounts.
  - Ban System: Let you ban or unban the whole system accounts.
  - Activity Logs: Logs all user's sessions (Date/Time) with location and ip (If there's no interent access, The system will ignore location/ip).
  - You can download current localstorage data using "Generate Report" button. The data will be downloaded in JSON format.
  
  This panel only showed for admins and some validations are considered for employees trying to access the page.
  
  #### Employee Panel
  This part contains logged in employee's activity under two categories:
  - Reports which contains two categories (Monthly/Daily Reports):
  Monthly Reports: Shows total Attendance/Absence/Late times in every month.
  Daily Reports: Shows Attendance/Absence/Late times in every day in a well organized way.
  - Confirm Attendance: It's to confirm that the employee attended in the system.
  
  The system will ignore admins data.
  
  A validation is considered in the confirm attendance to prevent multi attendance in a day.
  
  #### Profile
  This page contains three categories of current logged in user:
  - User Data: Contains personal registered user data.
  - Change Password: You can change your current password anytime. The system will notify the user with a message sent to his email.
  - Activity Logs: Logs all sessions of the current logged in user (Date/Time/IP/Location).
  
## TECHNOLOGIES
  - HTML/HTML5
  - CSS/CSS3
  - JS/ES6
  - Bootstrap

## OTHER LIBRARIES
  - Jquery
  - Datatables
  - Chart
  - Fontawesome

## USAGE
  - The system will auto create an admin account if the account wasn't found in the localstorage or if the localstorage wasn't even found in login page with the following data:
  Username : admin
  Password : 123456
  
  - You can login, Download the JSON file, Make your own changes, and make a new localstorage with name "jsondata" then copy/paste the data inside the JSON file.
  
## PREVIEW
  ![alt text](https://i.imgur.com/DgVdCLb.gif)

## TO-DO List

- Make an Account control in the admin panel.
- Add more features.


## ABOUT
  **Mohamed Hamdi Ahmed**  
  Email: **mohamed2007969@gmail.com**  
  LinkedIn: [**mamo007**](https://www.linkedin.com/in/mamo007/)  
