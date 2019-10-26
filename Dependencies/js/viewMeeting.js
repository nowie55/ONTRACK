let viewMeeting = [];
let meetingId=0; 
let inviteEmployees=[]; 
let employee = [];           
function load() {        //this loads data from a server and puts the returned data into the selected element
meetingId=window.localStorage.getItem("meetingId");
     $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/viewMeeting/' + meetingId,
    success: function (result) {
        console.log(result['users[0][department]']);
        count= result['count']
        populateTable(result, count);
        }
    });  
}
//method for generating the body of the dynamic table
function populateTable(result, count) {
    document.getElementById('viewMeetingBody').innerHTML = " ";
    for (let i = 0; i < count; i++) {
        let contained = document.createElement("tr");
        contained.innerHTML = `
                            <td class="inviteId">${result['users['+i+'][id]']}</td>
                            <td>${result['users['+i+'][firstName]']}</td>
                            <td>${result['users['+i+'][lastName]']}</td>
                            <td>${result['users['+i+'][email]']}</td>
                            <td>${result['users['+i+'][department]']}</td>
                            <td>${result['users['+i+'][áttendance]']==1?'yes':'no'}  <input onClick=attendance(${i}) type="checkbox" class="attendance-box" /></td>
                            <td>
                            <button class="btn btn-sm btn-danger remove">Remove</button>
                            </td> 
                            </tr>`;
        document.getElementById('viewMeetingBody').appendChild(contained);
    }
}
// this method is used to remove an employee from a meeting using the employee ID.
$('.viewMeetingTable').on('click', '.remove', function () {
    var $this = $(this);
    var id = $this.parent().siblings('.inviteId');
    var idValue = id.text();
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/viewMeeting/' + idValue,
        success: function (result) {
            location.reload();
        }
    })
    alert('Employee with id ' + idValue + ' removed from meeting');
})
//method for checking each employee's attendance
function attendance(i) {
        meetingId=window.localStorage.getItem("meetingId");
        var $this = $(this);
        var id = $this.parent().siblings('.inviteId');
    $.getJSON('http://localhost:3000/viewMeeting/' + meetingId, function (data) {
        data['users['+i+'][áttendance]'] = data['users['+i+'][áttendance]']==0?1:0;
        $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/viewMeeting/' + meetingId,
        data: data,
        success: function (result) {
        alert('Attendance updated');
                }
        });
    });
}
// this takes the admin to the employee's page from the view meeting page
$('#employee').click(function () {
    window.location.assign("/employee.html");                      
}) 
// to redirect create meeting to the meeting page from the view meeting page
$('#meeting1').click(function () {
    window.location.assign("/meeting.html");                      
})  
// this method is used to add an employee to a meeting
$('#inviteEmployee').click(function (e) {                                  
    $.getJSON("db.json", function (json) {
        employee = json.employee;
        callTable(employee);   
    });
    function  callTable(data) {
        document.getElementById('inviteBody').innerHTML = " ";
        for (let i = 0; i < employee.length; i++) {    
           let contain = document.createElement("tr");
            contain.innerHTML = `
                                <td class="inviteId">${data[i]['id']}</td>
                                <td class="firstName">${data[i]['firstName']}</td>
                                <td class="lastName">${data[i]['lastName']}</td>
                                <td class="email">${data[i]['email']}</td>
                                <td class="department">${data[i]['department']}</td>
                                <td><input onClick=invite(${data[i]['id']}) type="checkbox" class="invite-box" ${data[i]['invite'] == 'true' ? 'checked' : ''} /></td>                                             
                                </tr>`;
            document.getElementById('inviteBody').appendChild(contain);
        }
    }
})
//method for inviting employee to meeting
$('.invite-table').on('click', '.invite-box', function () {
    var selected = {};
        $('#addEmployee').click(function(e) { 
        meetingId=window.localStorage.getItem("meetingId"); 
            $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/viewMeeting',
            success: function (result) {    
            selected=result;
            result["invitedMembers[]"] = inviteEmployees; 
            var users = [];
            result["invitedMembers[]"].forEach(id => {
            employee.forEach(user => {
        if(id == user['id']) {                                    
            user['áttendance']=0
            users.push(user)                                                                
                }
            })
        })
            var invite = {
            id: meetingId,
            users: users,
            count: users.length
                }
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/viewMeeting/35',
            success: function (result) {                                
            updateToViewMeeting(invite, meetingId)                     
                },
            error: function(error){                                 
            if(error['status'] ==404) {
            addToViewMeeting(invite)
            }
            }                           
        })
    }
    });   
});
})
function invite(id){
    console.log("clicked id :: ", id)
  if(inviteEmployees.includes(id)){
    inviteEmployees.splice(inviteEmployees.indexOf(id), 1);
}else{ 
     inviteEmployees.push(id);
     }
}
function updateToViewMeeting(user, meetingId){
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/viewMeeting/'+meetingId,
        data: user,
        success: function (result) {
           console.log("viewing result :: ", result)
        }
    }); 
}

function addToViewMeeting(user){
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/viewMeeting',
        data: user,
        success: function (result) {           
        }
    }); 
}