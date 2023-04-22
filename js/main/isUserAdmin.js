// Hide admin panel if user is not admin
window.addEventListener('load', function(){
let jsondata = JSON.parse(localStorage.getItem('jsondata'));

    for (let i = 0; i < jsondata.length; i++) 
    {
        if(jsondata[i].username == sessionStorage.getItem('loggedusername'))
            if(jsondata[i].flag == 1)
                document.getElementById('adminpanel').classList.remove("d-none");
            else
            document.getElementById('adminpanel').classList.add("d-none");
    }
});