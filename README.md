# Treehouse Techdegree Project 2 - List Pagination and Filtering

Objective:
This project creates pagination buttons for a list of student information. It
also allows users to search the list of students.

Functionality:
The page displays 10 students per page, and provides the buttons at the bottom
of the page to allow users to select a different set of 10 students depending
on the page number. The page also provides a search component to allow users to
search for a particular student by name.

Implementation:
The program first declares global variables. These include various DOM elements
as well as variables representing the default page number to show on screen
when the page load and the default number of students to display on each page.
It includes the following functions:
  1.) showPage(), which takes arguments for a list and a page number. This
      function begins by clearing the page of any students, then calculates the
      upper and lower bounds for students to display from the provided list
      based on the page number provided. It changes the CSS 'display' property
      to show the students within these bounds and hides all of the others.
  2.) appendPageLinks(), which takes an argument for a list. It first clears
      the container div of the pagination buttons, then calculates the proper
      number of buttons. These buttons are generated dynamically by creating
      link and list item elements, and are then added to the unordered list in
      the container div. This function also contains a click event listener for
      the pagination buttons that clears the 'active' CSS class from the
      previous pagination button and reassigns that class to the button that
      has been clicked, before calling showPage() to display the appropriate
      10 students for the new page.
  3.) performSearch(), which takes arguments for a list, search input, and a
      container div. Creates a new list to hold students filtered by the
      search. It selects all of the student names and email addresses, and then
      compares the search input to the lists of names and email addresses for a
      match. If a match is found, the matching student's information is pushed
      to the list of filtered students. This function also creates a message
      notifying users if their search yielded no results by creating a span and
      appending it to the container div for the search component. If the search
      did have results, this message is removed (if present) and showPage() and
      appendPageLinks() are called to display the filtered list of students and
      the proper number of pagination buttons.
  4.) appendSearchComponent(), which takes an argument for a list. This
      function creates elements for a container div, a text input and a button
      and appends them to the page's header. It also provides two event
      listeners: one for clicks on the search button and one for keyup on the
      text input. Both of these event listeners call performSearch() by passing
      arguments for the provided list and the created search input and
      container div.
The program concludes by calling showPage() using the list of students and the
default page to be displayed when the web page loads. It calls appendPageLinks()
and passes the list of students and calls appendSearchComponent() and passes
the list of students. These function calls initialize the web page and generate
the pagination buttons and the search component.
