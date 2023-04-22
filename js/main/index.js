
// Get our session logged data

if(sessionStorage.getItem('loggedusername') != null && sessionStorage.getItem('loggedrole') != null)
{
    let getUserRole = sessionStorage.getItem('loggedrole');
    if(getUserRole == 0)
    {
        document.getElementById('loggedRole').innerText = 'Employee';
        document.getElementById('loggedRole').style.color = "orange";
    }
    else if(getUserRole == 1)
    {
        document.getElementById('loggedRole').innerText = 'Admin';
        document.getElementById('loggedRole').style.color = "red";
    }
    document.getElementById('loggedUsername').innerText = ' - ' + sessionStorage.getItem('loggedusername');
}
else
    window.location.href="login.html"; // if direct access without login

// Remove session on logout
document.getElementById('logout').addEventListener('click', function(){
    sessionStorage.removeItem("loggedusername");
    sessionStorage.removeItem("loggedrole");
    sessionStorage.removeItem("loggedname");
    sessionStorage.removeItem("attendancetime");
});