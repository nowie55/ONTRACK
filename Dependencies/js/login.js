
/*$(document).ready(function () {
    $.get("http://localhost:3000/admin", function (data, status) {

    console.log(data);
        $('.login').click(function () {
            let email = $("#email").val();
            let password = $("#password").val();
            for (i = 0; i < data.length; i++) {

                window.location.assign("/employee.html");

            }
        });
    });
});*/






/*$(document).ready(function (){
    $.get("http://localhost:3000/admin", function (data, status) { 
        console.log(data); 
        $('#login').click(function(){
            let email = $('#email').val();
            console.log("This is my  email", email);
            let password = $('#password').val();
            if ((email === "" ||email.length < 0) || (password.length < 0 || password === ""))
                {
                    alert("Please fill all fields");
                } 
            else
                {
            console.log(password) 
            
                for(let i=0; i < data.length; i++)
                    {      
                if (password === data[i].password && email === data[i].email)
            
                    {
                        window.location.assign("/employee.html");
                    }
                else 
                    {
                        alert("Invalid email/password");
                    }        
                    }
                }
        });
    });

}); 

/*
$$(document).ready({function loginUser() {
  $('#login-form').submit(function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const url = $(this).attr('action');
    if (email.length < 1) {
      alert("Please enter your email address");
    } else if (password.length < 1) {
      alert("Please enter your password");
    } else {
      $.ajax({
        url: url + `/?email=${email}&&password=${password}`,
        type: 'GET',
        dataType: 'json'
      }).done((data) => {
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(data[0]));
        // Retrieve from localStorage
        const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        console.log(data)
        if (data.length === 0) {
          alert('User login credentials incorrect')
        } else {
          if (data.isAdmin !== true) {
            window.location.replace('../html/create.html')
          } else {
            window.location.replace('../html/admin.html')
          }
        }
      })
    }
    return false;
  })
});


*/