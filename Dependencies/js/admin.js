




/* Side bar */
let element = document.getElementsByClassName("main");
let navOpen = document.getElementById("navOpen");

function openNav() {
  document.getElementById("mySidenav").style.width = "153px";

  for (let i = 0; i < element.length; i++) {
    element[i].style.marginLeft = '150px';
  }

  navOpen.style.display = "none";

//   document.getElementsByClassName("main").style.marginLeft = "150px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";

  for (let i = 0; i < element.length; i++) {
    element[i].style.marginLeft = '0px';
  }

  navOpen.style.display = "block";
//   document.getElementsByClassName("main").style.marginLeft= "0";
}

/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
let dropdown = document.getElementsByClassName("dropdown-btn");


for (let i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

