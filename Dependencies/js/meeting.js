var meeting = []; 
id = 0;             


//this is used to add a new meeting to the system
$('#createMeeting').click(function () {
    let topic = $("#topic").val();
    let description = $("#description").val();
    let date = $("#date").val();
    let time = $("#time").val();
    let invitedMembers = [0];

    if(topic == "" || description == "" || date == "" || time == "")
    {
        alert("Please fill all fields");
    }
    else{

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/meeting/',
        data: { topic: topic, description: description, date: date, time: time, invitedMembers: invitedMembers}, 
        success: function (result) {
            alert('New Meeting created');
            location.reload();
        }
    })

}

})

function load() {       //this loads data from a server and 
                        //puts the returned data into the selected element
    $.getJSON("db.json", function (json) {
        meeting = json.meeting;
        populateTable(meeting);
    });
}

//method for generating the body of the dynamic table

function populateTable(data) {
    document.getElementById('meetingBody').innerHTML = " ";
    for (let i = 0; i < meeting.length; i++) {
        let container = document.createElement("tr");
        container.innerHTML = `
                                               <td class="meetingId"><a id="meetingId" onClick="getMeetingId(${data[i]['id']})">${data[i]['id']}</a></td>
                                               <td class="topic">${data[i]['topic']}</td>
                                               <td class="description">${data[i]['description']}</td>
                                               <td class="date">${data[i]['date']}</td>
                                               <td class="time">${data[i]['time']}</td>
                                            
                                               <td>
                                               <button class="btn btn-sm btn-warning edit" data-toggle="modal" data-target="#editMeetingModal">Edit</button>
                                               <button class="btn btn-sm btn-danger delete">Delete</button>   
                                             </td> 
                                                </tr>`;
        document.getElementById('meetingBody').appendChild(container);
    }

}

// this takes the admin to the employee's page from the meeting page
$('#employee').click(function () {

    window.location.assign("/employee.html");
                      
})  


// this method is used to delete a meeting using the ID of the meeting
$('.meeting-table').on('click', '.delete', function () {
    var $this = $(this);
    var id = $this.parent().siblings('.meetingId');
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
    id =    $(e.target).closest('tr').find(".meetingId").html();
   
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
        data: { topic: topic, description: description, date: date, time: time}, 
        success: function (result) {
            alert('Meeting updated successfuly');
            location.reload();
        }
   



})


})

// this takes the admin to the viewMeeting.html(work in progress)
// $('.meetingId').click(function () {

//     window.location.assign("/viewMeeting.html");
                      
// })  

// this takes the admin to the viewMeeting.html(work in progress)
function getMeetingId(id) {
   
let meetingId = id

window.localStorage.setItem("meetingId", meetingId);
window.location.assign("/viewMeeting.html");

}





