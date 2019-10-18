
$(document).ready(function () {
    $.get("http://localhost:3000/employees", function (data, status) {
        $('.signup').click(function (){
                let firstName = $("#firstName").val();
                let lastName = $("#lastName").val();
                let email = $("#email1").val();
                let department = $("#department").val();
                let password1 = $("#password1").val();
                let password2 = $("#password2").val();
            
            if(password1 !== password2)
                {
                    alert("Passwords don't match");
                }
            else if (firstName !== "" && lastName !== "" && email !== "" && department !== "" && password1 !== "" && password2 !== "" && (password1 === password2) ) 
                {
                    $.post("http://localhost:3000/employees", { firstName, lastName, email, department, password }, function () {
                    window.location.assign("/employees.html");
                    alert("Signup successful, please login");
                });
                } 
            else 
                { 
                    alert("Please fill in all fields"); 
                }


        });
    });

});








