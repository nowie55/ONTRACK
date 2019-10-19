var meeting = [];        //an array used to store all meeting         
var container;          //define html contents for the table


//this is used to add a new meeting to the system
$('#createMeeting').click(function () {
    var topic = $("#topic").val();
    var description = $("#description").val();
    var date = $("#date").val();
    var time = $("#time").val();

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
        container;
        populateTable(meeting);
    });
}
//method for generating the body of the dynamic table
function populateTable(data) {
    document.getElementById('meetingBody').innerHTML = " ";
    for (let i = 0; i < meeting.length; i++) {
        container = document.createElement("tr");
        container.innerHTML = `
                                               <td class="row-id">${data[i]['id']}</td>
                                               <td>${data[i]['topic']}</td>
                                               <td>${data[i]['description']}</td>
                                               <td>${data[i]['date']}</td>
                                               <td>${data[i]['time']}</td>
                                               <td>
                                               <button class="btn btn-sm btn-primary delete">Edit</button>           
                                               <button class="btn btn-sm btn-danger delete">Delete</button>
                                               <button class="btn btn-sm btn-success add">Add to meeting</button>
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
            console.log(result);
            location.reload();
        }
    })
    alert('Employee with id ' + idValue + ' deleted');
})