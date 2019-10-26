$(document).ready(function () {
    $('#signup').on('click', function (){
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let email = $("#email1").val();
            let department = $("#department").val();
            let password = $("#password1").val();
            let password2 = $("#password2").val();
        
        if(password !== password2 || firstName == "" || lastName == "" || email == "" || department == "" || password == "" || password2 == "")
            {
                alert("Please fill all fields and make sure passwords match");
            }
            else{
           
            $.ajax({
                type:"POST",
                url:"http://localhost:3000/admin",
                data:{ firstName, lastName, email, department, password},
                success:function(){
                    window.location.assign("/index.html");
                    alert('Signup successful, please login')
                }
            })
        }
  
});
});















