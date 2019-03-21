/*
* Treehouse Techdegree Project 2 - List Pagination and Filtering
* Jacob Knecht
* 3/20/2019
*/

//global variable declarations
const page = document.querySelector('div.page');
const studentList = document.querySelectorAll('.student-item');
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
const ul = document.createElement('ul');
const message = document.createElement('span');
const divBreak = document.createElement('br');
const defaultPage = 1;
const studentsPerPage = 10;


//create a function that only shows the ten students that correspond with the
//page indicated by the current page number
function showPage(list, pageNumber) {
  //clear the page of any students
  for (let i = 0; i < studentList.length; i += 1) {
    studentList[i].style.display = 'none';
  }
  //create bounds for student display depending on page number
  const upperLimit = pageNumber * studentsPerPage; //10, 20, 30, etc
  const lowerLimit = (pageNumber - 1) * studentsPerPage; //0, 10, 20, etc
  for (let i = 0; i < list.length; i += 1) {
    if (i >= lowerLimit && i < upperLimit) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
}

//create a function to generate and append pagination buttons to the page
function appendPageLinks(list) {
  //clear the container div of previous contents if it has any
  if (ul.hasChildNodes()) {
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
    }
  }
  //generate the correct number of pagination buttons
  const numberOfButtons = Math.ceil(list.length / studentsPerPage);
  //dynamically generate pagination buttons
  for (let i = 1; i <= numberOfButtons; i += 1) {
    //create list item and link elements
    const li = document.createElement('li');
    const a = document.createElement('a');
    //set link href class and text content
    a.href = '#';
    a.textContent = i;
    //update the CSS class 'active' so that the first page is active by default
    if (i === 1) {
      a.className = 'active';
    }
    //append link to list item and list item to unordered list
    li.appendChild(a);
    ul.appendChild(li);
  }
  //append unordered list to container div and then add container div to page
  paginationDiv.appendChild(ul);
  page.appendChild(paginationDiv);
  //create event listener for pagination buttons to add functionality
  ul.addEventListener('click', (e) => {
    //store active link
    const link = e.target;
    //remove CSS class 'active' from old active button and add it to current
    //active button
    if (link.className !== 'active') {
      const oldActive = document.querySelector('a.active');
      oldActive.className = '';
      link.className = 'active';
    }
    //only show the ten students that correspond with the current page
    showPage(list, parseInt(link.textContent));
  });
}

//create a function for search functionality
function performSearch(list, input, div) {
  //create a list of student names and email addresses, as well as a list to
  //hold the filtered list of students based on search input
  const filteredList = [];
  const namesList = document.querySelectorAll('div.student-details h3');
  const emailList = document.querySelectorAll('div.student-details span.email');
  //search for input text in student's name or email address
  for (let i = 0; i < list.length; i += 1) {
    //turn input text to lower case to make program more robust
    const inputText = input.value.toLowerCase();
    //check for input text in the list of names and emails
    if (namesList[i].textContent.includes(inputText) ||
      emailList[i].textContent.includes(inputText)) {
      //if the search input is in the student's name or email address,
      //add that student to the filtered list
      filteredList.push(list[i]);
    }
  }
  //code to test whether filterdList is empty/returns no results and
  //create message notifying the user that there are no search results
  message.textContent = 'Search for ' + "'" + input.value + "'" +
    ' returned no results.';
  //message.style.textAlign = 'center';
  if (filteredList.length === 0) {
    //produce a message in container div for the search
    div.appendChild(divBreak);
    div.appendChild(message);
  } else {
    //remove the 'no results' message if it is on the page
    if (message.parentNode === div) {
      div.removeChild(message);
      div.removeChild(divBreak);
    }
    //show list of filtered students
    showPage(filteredList, defaultPage);
    //paginate the list of filtered students
    appendPageLinks(filteredList);
  }
}

//create a function to dynamically create, append, and add functionality to
//a search component that can filter student results based on search value
function appendSearchComponent(list) {
  //create container div for search component
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  //create the search text input and button elements
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search for students...';
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  //append search text input and button to container div
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
  //append container div to the page
  const header = document.querySelector('div.page-header');
  header.appendChild(searchDiv);
  //create event listener for click on search button
  searchButton.addEventListener('click', (e) => {
    performSearch(list, searchInput, searchDiv);
  });
  //create an event listener for keyup in search input
  searchInput.addEventListener('keyup', (e) => {
    performSearch(list, searchInput, searchDiv);
  });
}

//call showPage to set page 1 as default when loaded
showPage(studentList, defaultPage);
//call appendPageLinks to create and append pagination buttons to the page and
//run event listener
appendPageLinks(studentList);
//call appendSearchComponent to create and append search text input and
//button to the page
appendSearchComponent(studentList);
