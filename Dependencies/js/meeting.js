var meeting = []; 
id = 0;       //an array used to store all meeting         
// var container;          //define html contents for the table
// var contain;


//this is used to add a new meeting to the system
$('#createMeeting').click(function () {
    let topic = $("#topic").val();
    let description = $("#description").val();
    let date = $("#date").val();
    let time = $("#time").val();

    if(topic == "" || description == "" || date == "" || time == "")
    {
        alert("Please fill all fields");
    }
    else{

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/meeting/',
        data: { topic: topic, description: description, date: date, time: time}, //, attendance: false
        success: function (result) {
            alert('New Meeting created');
            location.reload();
        }
    })

}

})

function load() {     //this loads data from a server and 
    //puts the returned data into the selected element
    $.getJSON("db.json", function (json) {
        meeting = json.meeting;
        // container;
        populateTable(meeting);
    });
}
//method for generating the body of the dynamic table

function populateTable(data) {
    document.getElementById('meetingBody').innerHTML = " ";
    for (let i = 0; i < meeting.length; i++) {
        let container = document.createElement("tr");
        container.innerHTML = `
                                               <a href="#"<td class="row-id">${data[i]['id']}</td></a>
                                               <td class="topic">${data[i]['topic']}</td>
                                               <td class="description">${data[i]['description']}</td>
                                               <td class="date">${data[i]['date']}</td>
                                               <td class="time">${data[i]['time']}</td>
                                               <td>
                                               <button class="btn btn-sm btn-danger delete">Delete</button>
                                               <button class="btn btn-sm btn-warning edit" data-toggle="modal" data-target="#editMeetingModal">Edit</button>   
                                               <button class="btn btn-sm btn-success add" data-toggle="modal" data-target="#addEmployeeModal">Add to meeting</button>
                                             </td> 
                                                </tr>`;
        document.getElementById('meetingBody').appendChild(container);
    }

}
//<td><input type="checkbox" class="attendance-box" ${data[i]['attendance'] == 'true' ? 'checked' : ''} /></td>
//<td>
// this takes the admin to the employee's page from the meeting page
$('#employee').click(function () {

    window.location.assign("/employee.html");
                      
})  

// to implement logout functionality
$('#logout').click(function () {

    window.location.assign("/index.html");
                      
})  

// this method is used to delete a meeting using the ID of the meeting
$('.meeting-table').on('click', '.delete', function () {
    var $this = $(this);
    var id = $this.parent().siblings('.row-id');
    var idValue = id.text();
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/meeting/' + idValue,
        success: function (result) {
           
            location.reload();
        }
    })
    alert('Meeting with id ' + idValue + ' deleted');
})

// edit meeting
$('.meeting-table').on('click', '.edit', function(e) {

    var topicc =   $(e.target).closest('tr').find(".topic").html();
    var descriptionn =   $(e.target).closest('tr').find(".description").html();
    var datee =   $(e.target).closest('tr').find(".date").html();
    var timee =   $(e.target).closest('tr').find(".time").html();
    id =    $(e.target).closest('tr').find(".row-id").html();
   
$("#topic1").val(topicc);
$("#description1").val(descriptionn);
$("#date1").val(datee);
$("#time1").val(timee);


})

$('#updateMeeting').click(function(e) {

  
let topic= $("#topic1").val();
let description=$("#description1").val();
let date=$("#date1").val();
let time=$("#time1").val();

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/meeting/' +id,
        data: { topic: topic, description: description, date: date, time: time}, //, attendance: false
        success: function (result) {
            alert('Meeting updated successfuly');
            location.reload();
        }
   



})


})

// this takes the admin to the viewMeeting.html(work in progress)
$('.row-id').click(function () {

    window.location.assign("/viewMeeting.html");
                      
})  

//this is used to add an employee to a meeting(work in progress)
// $('#rowAdd').click(function () {
//     let firstName = $("#firstName2").val();
//     let lastName = $("#lastName2").val();
//     let email = $("#email2").val();
//     let department = $("#department2").val();
//     let attendance = $("#attendance").val();

//     if(firstName == "" || lastName == "" || email == "" || department == "" || attendance == "")
//     {
//         alert("Please fill all fields");
//     }
//     else{

//     $.ajax({
//         type: 'POST',
//         url: 'http://localhost:3000/viewMeeting/',
//         data: { firstName: firstName, lastName: lastName, email: email, department: department, attendance: attendance}, //, attendance: false
//         success: function (result) {
//             alert('Employee added to meeting successfuly');
//             location.reload();
//         }
//     })

// }

// })

// this method is used to add an employee to a meeting
$('.meeting-table').on('click', '.add', function () {                                 //this loads data from a server and 
    //puts the returned data into the selected element
   
    $.getJSON("db.json", function (json) {
        employee = json.employee;

               // contain;
        callTable(employee);
       
        
    });

    function  callTable(data) {
        document.getElementById('inviteBody').innerHTML = " ";
        for (let i = 0; i < employee.length; i++) {
           let contain = document.createElement("tr");
            contain.innerHTML = `
                                                   <td class="row-idd">${data[i]['id']}</td>
                                                   <td class="firstName">${data[i]['firstName']}</td>
                                                   <td class="lastName">${data[i]['lastName']}</td>
                                                   <td class="email">${data[i]['email']}</td>
                                                   <td class="department">${data[i]['department']}</td>
                                                   <td><input type="checkbox" class="invite-box" ${data[i]['invite'] == 'true' ? 'checked' : ''} /></td>
                                                   
                                                    </tr>`;
            document.getElementById('inviteBody').appendChild(contain);
        }
    
    }
})

// $('#addEmployee').on('click', function () {
//     var $this = $(this);
//     let checker = $('#checker');
//     // var id = $this.parent().siblings('modal-body').childNodes;
//     // var idValue = id.text();

//     var added = checker.is(':checked'); //<p> I am good <p/>
//     console.log('$this: ', $this);
//     console.log('checker: ', checker);
//     // console.log('idValue: ', idValue);
//     console.log('added: ', added);

    // $.getJSON('http://localhost:3000/inviteMeeting/' + idValue, function (data) {
    //     data.invite = added;
    //     $.ajax({
    //         method: 'PUT',
    //         url: 'http://localhost:3000/inviteMeeting/' + idValue,
    //         data: data,
    //         success: function (result) {
    //             alert('Invited to meeting successfully');
    //         }
    //     });
    // });
// });

//method for inviting employee to meeting
$('.invite-table').on('click', '.invite-box', function () {
    var $this = $(this);
    var id = $this.parent().siblings('.row-idd');
    var idValue = id.text();
    var added = $this.is(':checked'); //<p> I am good <p/>

    $.getJSON('http://localhost:3000/inviteMeeting/' + idValue, function (data) {
       
        data.invite = added;
        console.log("this is d ", data)
        console.log("this is d ", idValue)


        $.ajax({
            method: 'PUT',
            url: 'http://localhost:3000/inviteMeeting/' + idValue,
            data: data,
            success: function (result) {
                alert('Invite successful');
            }
        });
    });
});



