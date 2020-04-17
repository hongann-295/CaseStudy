var login = login || {};

login.check = function(){
    let gmail = $('#username').val();
    let pass = $('#pass').val();
    let isLogged = false;
    $.ajax({
        url: "https://honganstore.herokuapp.com/user",
        method: "GET",
        datatype: "json",
        success: function(data){
            $.each(data, function(i, v){
                if(v.username == gmail && v.password == pass){
                    isLogged = true;
                    window.location.href = "../admin/dashboard.html"
                }
            })
            if(!isLogged){
                $('#loginFail').removeClass('d-none');
            }
        }
    })
}

$(document).ready(function(){

})