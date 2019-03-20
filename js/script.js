/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const page = document.querySelector('div.page');
const studentList = document.querySelectorAll('.student-item');
const paginationDiv = document.createElement('div');
const ul = document.createElement('ul');
const defaultPage = 1;
const studentsPerPage = 10;


/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function -- DONE
***/
function showPage(list, pageNumber) {
  //clear the page of any students
  for (let i = 0; i < studentList.length; i += 1) {
    studentList[i].style.display = 'none';
  }
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



/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons. --DONE
***/
function appendPageLinks(list) {
  //generate the correct number of pagination buttons
  const numberOfButtons = Math.ceil(list.length / studentsPerPage);
  //create container div to hold pagination buttons
  // const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  //create unordered list to contain the buttons
  // const ul = document.createElement('ul');
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
  //create event listener for pagination buttons
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
    showPage(studentList, parseInt(link.textContent));
  });
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
    //create a list of student names and email addresses, as well as a list to
    //hold the filtered list of students based on search input
    const filteredList = [];
    const namesList = document.querySelectorAll('div.student-details h3');
    const emailList = document.querySelectorAll('div.student-details span.email');
    //search for input text in student's name or email address
    for (let i = 0; i < list.length; i += 1) {
      //turn input text to lower case to make program more robust
      const input = searchInput.value.toLowerCase();
      //check for input text in the list of names and emails
      if (namesList[i].textContent.includes(input) ||
        emailList[i].textContent.includes(input)) {
        // console.log(namesList[i].textContent);
        // console.log(emailList[i].textContent);
        filteredList.push(list[i]);
      }
    }
    //show list of filtered students
    showPage(filteredList, defaultPage);
    //paginate the list of filtered students
    appendPageLinks(filteredList);
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



// Remember to delete the comments that came with this file, and replace them with your own code comments.
