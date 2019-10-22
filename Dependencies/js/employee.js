var employee = [];        //an array used to store all employee         
var contain;
var id=0;          //define html contents for the table


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

// jQuery.get('127.9.4.0:3000/employee', function(data) {

// })
//method for generating the body of the dynamic table
function populateTable(data) {
    document.getElementById('body').innerHTML = " ";
    for (let i = 0; i < employee.length; i++) {
        contain = document.createElement("tr");
        contain.innerHTML = `
                                               <td class="row-id">${data[i]['id']}</td>
                                               <td class="firstName">${data[i]['firstName']}</td>
                                               <td class="lastName">${data[i]['lastName']}</td>
                                               <td class="email">${data[i]['email']}</td>
                                               <td class="department">${data[i]['department']}</td>
                                               <td>
                                               <button class="btn btn-sm btn-warning edit" id="rowEdit"  data-toggle="modal" data-target="#editEmployeeModal">Edit</button>           
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
        url: 'http://localhost:3000/employee/' + idValue,
        success: function (result) {
            console.log(result);
            location.reload();
        }
    })
    alert('Employee with id ' + idValue + ' deleted');
})

//method for reading an employee(in progress)
$('#search-bar').keyup(event => {

    let filteredResult = employee.filter(employee => {
        if (event.target.value === '') {
            populateTable(employee)
        }

        return employee.id.includes(event.target.value)  //it filters out the employee which matches the ID being searched 
    })
    populateTable(filteredResult);
})


//method for editing an employee

$('.employee-table').on('click', '.edit', function(e) {

    var fName =   $(e.target).closest('tr').find(".firstName").html();
    var lName =   $(e.target).closest('tr').find(".lastName").html();
    var mail =   $(e.target).closest('tr').find(".email").html();
    var dept =   $(e.target).closest('tr').find(".department").html();
    id = $(e.target).closest('tr').find(".row-id").html();
   
$("#firstName1").val(fName);
$("#lastName1").val(lName);
$("#email1").val(mail);
$("#department1").val(dept);


})

$('#updateEmployee').click(function(e) {

  
let firstName= $("#firstName1").val();
let lastName=$("#lastName1").val();
let email=$("#email1").val();
let department=$("#department1").val();

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/employee/' +id,
        data: { firstName: firstName, lastName: lastName, email: email, department: department}, //, attendance: false
        success: function (result) {
            alert('Employee edited successfuly');
            location.reload();
        }
   



})


})