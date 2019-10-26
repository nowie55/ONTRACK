// $(document).ready(function () {
let viewMeeting = [];
let meetingId=0; 
let inviteEmployees=[]; 
let employee = []           
// let contained;          //define html contents for the table




function load() {        //this loads data from a server and 
                        //puts the returned data into the selected element
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
            console.log(result);
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
       console.log(i);
        var state = $this.is(':checked'); //<p> true <p/>
    
        $.getJSON('http://localhost:3000/viewMeeting/' + meetingId, function (data) {
            console.log("this is d ", data['users['+i+'][áttendence]']=="false" )
            data['users['+i+'][áttendance]'] = data['users['+i+'][áttendance]']==0?1:0
            // data['users['+i+'][áttendance]']= 1
            console.log("this is d 2 ", JSON.stringify(data ))
    
            // data.attendance = state;
            // console.log("this is d ", data)
    
            $.ajax({
                method: 'PUT',
                url: 'http://localhost:3000/viewMeeting/' + meetingId,
                data: data,
                success: function (result) {
                    console.log(meetingId)
                    console.log(JSON.stringify(result))
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
    var $this = $(this);
    var id = $this.parent().siblings('.inviteId');
    var idValue = id.text();
    var added = $this.is(':checked'); //<p>true<p/>
   

    // $.getJSON('http://localhost:3000/inviteMeeting/' + idValue, function (data) {       
    //     data.invite = added      
    //     if(data.invite = added){
        

        

            //dunno wot i'm doing here
        var selected = {};
        $('#addEmployee').click(function(e) { 
            meetingId=window.localStorage.getItem("meetingId");
                // {firstName: "Ime", lastName: "Kalu", email: "ime@yahoo.com", department: "Data Centre", invite: true, …}  
                $.ajax({
                    method: 'GET',
                    url: 'http://localhost:3000/viewMeeting',
                    success: function (result) {
                    
                selected=result;
                result["invitedMembers[]"] = inviteEmployees; 
                console.log("users :: ",result["invitedMembers[]"] )
                var users = []
                  result["invitedMembers[]"].forEach(id => {
                            console.log("my is:: ",id )
                            console.log(employee);
                       
                            employee.forEach(user => {
                                console.log("ïd ::", user['id'])
                                if(id == user['id']) {
                                    console.log("user ::", user)
                                    user['áttendance']=0
                                    users.push(user)
                                
                                   // user["meetingId"]=meetingId
                                    // addToViewMeeting(user)

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
                                console.log(result);
                                updateToViewMeeting(invite, meetingId)
                     
                             },
                             error: function(error){
                                 console.log("error ::", error['status'])
                                 if(error['status'] ==404) {
                                     console.log("adding new ", invite)
                                    addToViewMeeting(invite)
                                 }
                             }
                            
                            })
                         

                       
                // $.ajax({
                //     method: 'PUT',
                //     url: 'http://localhost:3000/meeting/' + meetingId,
                //     data: result,
                //     success: function (response) {
                    
                //         result["invitedMembers[]"].forEach(id => {
                //             console.log("my is:: ",id )
                //             employee.forEach(user => {
                //                 console.log("ïd ::", user["ïd"])
                //                 if(id === user["ïd"]) {
                //                     console.log("user ::", user)
                //                     user["meetingId"]=meetingId
                //                     addToViewMeeting(user)

                //                 }
                //             })
                //         })
                //         alert('Added to Meeting successfully');
                //         location.reload();
        
                //     }
                // });    
                      }
                }); 
                
                
      
    });

// }
        
// })
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
    console.log(user);
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
    console.log(user);
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/viewMeeting',
        data: user,
        success: function (result) {
           console.log("viewing result :: ", result)
        }
    }); 
}