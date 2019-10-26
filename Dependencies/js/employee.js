var employee = [];        //an array used to store all employee         
var id=0; 
searchEmployee=[]; 
//this is used to add a new employee to the system
$('#create-employee').click(function () {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var department = $("#department").val();
    if(firstName == "" || lastName == "" || email == "" || department == "")
        {
        alert("Please fill all fields");
        }else{
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/employee/',
        data: { firstName: firstName, lastName: lastName, email: email, department: department}, 
        success: function (result) {
            alert('New Employee created');
            location.reload();
        }
    })
            }
})
function load() {           //this loads data from a server and puts the returned data into the selected element
$.getJSON("db.json", function (json) {
    employee = json.employee;
    populateTable(employee);
    });
}
//method for generating the body of the dynamic table
function populateTable(data) {
    document.getElementById('body').innerHTML = " ";
    for (let i = 0; i < employee.length; i++) {
    let contain = document.createElement("tr");
    contain.innerHTML = `
                            <td class="employeeId">${data[i]['id']}</td>
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
    var id = $this.parent().siblings('.employeeId');
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
$('#search-bar').click(function(e) {
    var $this = $(this);
    var id = $this.parent().siblings('.employeeId');
    var idValue = id.text();
    let employeeId = $('#search-box').val();
    $.getJSON("db.json", function (json) {

        for(let i = 0; i < employee.length; i++){
            if(idValue==employeeid){
                searchEmployee.push(employeeId);
                consolde.log("this is", data);
            }
        }   
        
// console.log(employeeid);
//     // $.ajax({ 
//     //     type:"GET",
//     //     url:`http://localhost:3000/employee?id_like=${employeeid}`,
//     //     success:function(employee){
//     //         alert('Search now works')
//     //     }
//     // })
 
//     // let filteredResult = employee.filter(employee => {
//     //     if (event.target.value === '') {
//     //         populateTable(employee)
//     //     }

//     //     return employee.id.includes(event.target.value)  //it filters out the employee which matches the ID being searched 
    })
//     // populateTable(filteredResult);

populateTable(searchEmployee);
})
//method for editing an employee
$('.employee-table').on('click', '.edit', function(e) {
    var fName =   $(e.target).closest('tr').find(".firstName").html();
    var lName =   $(e.target).closest('tr').find(".lastName").html();
    var mail =   $(e.target).closest('tr').find(".email").html();
    var dept =   $(e.target).closest('tr').find(".department").html();
    id = $(e.target).closest('tr').find(".employeeId").html();
   
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
        data: {firstName: firstName, lastName: lastName, email: email, department: department}, 
        success: function (result) {
            alert('Employee updated successfully');
            location.reload();
        }
   })
})
