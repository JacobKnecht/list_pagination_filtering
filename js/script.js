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
const defaultPage = 1;
const studentsPerPage = 10;
console.log(studentList.length);



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
       "invoke" the function
***/
function showPage(list, pageNumber) {
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
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
  //generate the correct number of pagination buttons
  const numberOfButtons = Math.ceil(list.length / studentsPerPage);
  //create container div to hold pagination buttons
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  //create unordered list to contain the buttons
  const ul = document.createElement('ul');
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

//call showPage to set page 1 as default when loaded
showPage(studentList, defaultPage);
//call appendPageLinks to create and append pagination buttons and
//run event listener
appendPageLinks(studentList);



// Remember to delete the comments that came with this file, and replace them with your own code comments.
