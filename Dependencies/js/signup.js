$(document).ready(function () {
    $('#signup').on('click', function (){
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let email = $("#email1").val();
            let department = $("#department").val();
            let password = $("#password1").val();
            let password2 = $("#password2").val();
        
        if(password !== password2 || firstName == "" || lastName == "" || email == "" || department == "")
            {
                alert("Please fill all fields and make sure passwords match");
            }
            else{
            //     $.post("http://localhost:3000/employees", { firstName, lastName, email, department, password1 }, function () {
            //         alert("Signup successful, please login");
            //         //window.location.assign("");
                
            // });
            $.ajax({
                type:"POST",
                url:"http://localhost:3000/admin",
                data:{ firstName, lastName, email, department, password},
                success:function(){
                    alert('Signup successful, please login')
                }
            })
        }
    //});
});
});






/*$(document).ready(function () {
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

}); */








