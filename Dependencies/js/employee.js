var employee = [];        //an array used to store all employee         
var container;          //define html contents for the table


//this is used to add a new employee to the system
$('#createEmployee').click(function () {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var department = $("#department").val();

    if(firstName == "" || lastName == "" || email == "" || department == "")
    {
        alert("Please fill all fields");
    }
    else{

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/employee',
        data: { firstName: firstName, lastName: lastName, email: email, department: department}, //, attendance: false
        success: function (result) {
            alert('New Employee created');
            location.reload();
        }
    })

}

})




function load() {                                   //this loads data from a server and 
    //puts the returned data into the selected element
    $.getJSON("db.json", function (json) {
        employee = json.employee;
        container;
        populateTable(employee);
    });
}
//method for generating the body of the dynamic table
function populateTable(data) {
    document.getElementById('body').innerHTML = " ";
    for (let i = 0; i < employee.length; i++) {
        container = document.createElement("tr");
        container.innerHTML = `
                                               <td class="row-id">${data[i]['id']}</td>
                                               <td>${data[i]['firstName']}</td>
                                               <td>${data[i]['lastName']}</td>
                                               <td>${data[i]['email']}</td>
                                               <td>${data[i]['department']}</td>
                                               <td>
                                               <button class="btn btn-sm btn-primary delete">Edit</button>           
                                               <button class="btn btn-sm btn-danger delete">Delete</button>
                                             </td> 
                                                </tr>`;
        document.getElementById('body').appendChild(container);
    }

}
//<td><input type="checkbox" class="attendance-box" ${data[i]['attendance'] == 'true' ? 'checked' : ''} /></td>
//<td>