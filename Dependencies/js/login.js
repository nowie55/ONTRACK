
$(document).ready(function () {
  $('#login2').on('click',function() {
            let email = $("#email").val();
            let password = $("#password").val();

            if (email === ""  || password === "")
            {
                alert("Please fill all fields");
            } 
        else
            {
           
                $.get("http://localhost:3000/admin", function(data, status){
                  
                  for (i = 0; i < data.length; i++) {
                     if (password === data[i].password && email === data[i].email){
                      window.location.assign("/employee.html");
                      return
                     }
                      
                     
                    }
                    alert('Invalid username/password')
                });
             
          }
        });
    });

