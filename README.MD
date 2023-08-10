# Mongoose Flights
![mongoose-flights](/public/images/readme-imgs/mongoose-flights.png)

## Date: 5/23/2023

### By: Eric Polanco

#### [GitHub](https://github.com/epolancot) | [LinkedIn](www.linkedin.com/in/epolancot) 

---

## **Description**
Three parts full-stack project built with Node and MongoDB, leveraging Express, Mongoose and Bootstrap.


---

### **Technologies, Libraries and Frameworks Used**
- Node
- Express
- MongoDB
  - Mongoose
- Bootstrap 5

### Architecture 
MVC

---

### **Requirements**

### PART 1
- Implement a list of all flights (index functionality) that displays each flight's airline, airport, flight no., and departure date/time.
- Create flights functionality by entering the information on a page (new functionality) that has a form and submitting it.
- Access each view via a navigation bar at the top of the page with links to: [ All Flights ] [ Add Flight ]
- Supplementary:
  - Display the default departure date when displaying the new flight form.
  -  View the list of flights by departure date in ascending order.
  - Display flights in the list using red text if the flight's departure date has passed.

### PART 2
- Create a destination Schema that will provide the structure for destination subdocuments.
- Add a destination property to the Flight Model.
- When viewing the list of flights, the user should be able to click on a “detail” link displayed next to each flight to view all of the properties for that flight (show view).
- When viewing the details page (show view) for a flight, the user should be able to add a destination for that flight, including its arrival date/time & one of the established airport codes.
- When viewing the details page (show view) for a flight, The user should see a list of that flight’s destinations (airport & arrival).
- Supplementary:
  - The list of destinations for a flight should be sorted by the arrival date/time in ascending order.
  - When adding a destination for a flight, exclude the airports listed in the \<select> that have already been used by other destinations and/or the flight’s airport.
### PART 3
- Create a ticketSchema that will be compiled into a Ticket Model with the following properties: Seat (String - 'A1' trhu 'F99'), price and flight (ref: Flight).
- When viewing the detail page for a flight, the user should view a list of the tickets that have been created for that flight.
- Also on the flight’s show view, a New Ticket link should be displayed that when clicked, shows the ticket’s new view used to create a ticket for the flight. When the form is submitted, create the ticket on the server and redirect back to the flight’s show view.
- Supplementary:
  - Add a feature to delete flight's ticket.

## **Screenshots**
### Home Page
![Index](/public/images/readme-imgs/ss1-index.png)

Displays all flights' basic information. Includes a _view_ button for further details.
### Filter Option
![Filter](/public/images/readme-imgs/ss2-filter.png)

Displays flights by Airline. Allows access to each flight through a link in the flight's number.
### Add Flight
![Add Flight](/public/images/readme-imgs/ss3-add-flight.png)

All fields are required. Back-end sanitazion of inputs to store flight's information in a scalable format.
### Create Ticket
![Create Ticket](/public/images/readme-imgs/ss4-create-ticket.png)

All fields required. Front and back end efforts to avoid wrong input format and pattern. If the user lands from a Flight's page view, Flight Number field is automatically populated. 
### Show Flight
![Show Flight](/public/images/readme-imgs/ss5-flight.png)

Leveraging Bootrstap's collapse feature to display all flight's information in the most simple and user friendly way.
### Destinations
![Destinations](/public/images/readme-imgs/ss6-destinations.png)

Allows to add destinations to the flight, dismissing already used airports in that route from the list.
### Tickets
![Tickets](/public/images/readme-imgs/ss7-tickets.png)

Displays tickets a list of already created tickets. Also, allows to create and delete the tickets.
### Supplemenatry
![Tickets](/public/images/readme-imgs/ss8-supplementary.png)

Past flights are displayed in red.

---
### **Entity Relationship Diagram (EDR)**

{EDR}

--- 


