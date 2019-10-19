var employee = [];        //an array used to store all employee         
var contain;          //define html contents for the table


//this is used to add a new employee to the system
$('#create-employee').click(function () {
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
        url: 'http://localhost:3000/employee/',
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
        contain;
        populateTable(employee);
    });
}
//method for generating the body of the dynamic table
function populateTable(data) {
    document.getElementById('body').innerHTML = " ";
    for (let i = 0; i < employee.length; i++) {
        contain = document.createElement("tr");
        contain.innerHTML = `
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
        document.getElementById('body').appendChild(contain);
    }

}
//<td><input type="checkbox" class="attendance-box" ${data[i]['attendance'] == 'true' ? 'checked' : ''} /></td>
//<td>

// to redirect the meeting dropdown to the meeting page from the employee's page
$('#meeting').click(function () {

    window.location.assign("/meeting.html");
                      
})    

// to implement logout functionality
$('#logout').click(function () {

    window.location.assign("/index.html");
                      
}) 

// this method is used to delete an employee using the ID of the employee
$('.employee-table').on('click', '.delete', function () {
    var $this = $(this);
    var id = $this.parent().siblings('.row-id');

    var idValue = id.text();
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/users/' + idValue,
        success: function (result) {
            console.log(result);
            location.reload();
        }
    })
    alert('Employee with id ' + idValue + ' deleted');
})