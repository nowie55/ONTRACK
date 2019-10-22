let viewMeeting = [];        //an array used to store all meeting         
// let contained;          //define html contents for the table

//this is used to add an employee to a meeting
// $('#addEmployee').click(function () {
//     let firstName = $("#firstName").val();
//     let lastName = $("#lastName").val();
//     let email = $("#email").val();
//     let department = $("#department").val();
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


function load() {     //this loads data from a server and 
    //puts the returned data into the selected element
    $.getJSON("db.json", function (json) {
        viewMeeting = json.viewMeeting;
        populateTable(viewMeeting);
    });
}
//method for generating the body of the dynamic table
function populateTable(data) {
    document.getElementById('viewMeetingBody').innerHTML = " ";
    for (let i = 0; i < viewMeeting.length; i++) {
        let contained = document.createElement("tr");
        contained.innerHTML = `
                                                <td class="row-id">${data[i]['id']}</td>
                                                <td>${data[i]['firstName']}</td>
                                                <td>${data[i]['lastName']}</td>
                                                <td>${data[i]['email']}</td>
                                                <td>${data[i]['department']}</td>
                                               <td><input type="checkbox" class="attendance-box" ${data[i]['attendance'] == 'true' ? 'checked' : ''} /></td>
                                               <td>
                                               <button class="btn btn-sm btn-danger remove">Remove</button>
                                             </td> 
                                                </tr>`;
        document.getElementById('viewMeetingBody').appendChild(contained);
    }

}

// this method is used to remove an employee from a meeting using the employee ID.
$('.meeting-table').on('click', '.remove', function () {
    var $this = $(this);
    var id = $this.parent().siblings('.row-id');
    var idValue = id.text();
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/viewMeeting/' + idValue,
        success: function (result) {
            console.log(result);
            location.reload();
        }
    })
    alert('Employee with id ' + idValue + ' removed from meeting');
})

//method for checking each employee's attendance
$('.viewMeetingTable').on('change', '.attendance-box', function () {
    var $this = $(this);
    var id = $this.parent().siblings('.row-id');
    var idValue = id.text();
    var state = $this.is(':checked'); //<p> I am good <p/>

    $.getJSON('http://localhost:3000/viewMeeting/' + idValue, function (data) {
        console.log("this is d ", data)

        data.attendance = state;
        console.log("this is d ", data)

        $.ajax({
            method: 'PUT',
            url: 'http://localhost:3000/viewMeeting/' + idValue,
            data: data,
            success: function (result) {
                alert('Attendance updated');
            }
        });
    });
});
