# Employee_Manager

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## **Table of Contents**

- [Description](#Description)

- [Usage](#usage)

- [Technology](#technology)

- [Contribution](#contribution)

- [Questions](#questions)

---

## **Description**

An application that allows the user to manage the employees of a company. In it, they are able to add/edit an employee with their name, position, job title, department, direct manager, and start date. Employees can be archived, possibly due to recent separation from the company, where a record of that employee needs to be kept or even deleted from the employee database due to incorrectly being created.

Upon creating a new employee, a unique username and default password is generated for the employee. The username and password is used to access the employee manager application and depending on the employee's position, they will either be denied access to the managing tool (lower level employees) or allowed limited access to features in the application.

The application uses the Angular framework as the frontend as this allows for compartmentalizing the different components that will allow for easier reusability in the application and a separation of concerns when debugging. Choosing to use MongoDB as the database allowed for a low cost online database that is not saved on my local server/computer. The combination of Bootstrap and PrimeNg allowed quicker styling of the frontend for the user.

---

## **Usage**

To run the application locally, perform the following steps after.

- Clone the repository from https://github.com/JMan4342/Employee_Manager and open in your preferred code editor.
- Open your terminal.
- cd to the server folder (../Employee_Manager/server) and enter npm install to ensure you have all the dependencies installed to run the server backend.
- cd to the client folder (../Employee_Manager/Employee_Manager) and enter the npm install to ensure you have all the dependencies installed for the client side.
- To run the backend server, cd to the server folder (../Employee_Manager/server) and enter node server.js, or you can run the command node server/server.js from the root folder.
- To start the application, open a second terminal window (need both the server and client running), cd to the client folder (../Employee_Manager/Employee_Manager) and enter ng serve in your terminal.

There are no tests installed for the application.

---

## **Technology**

- Angular
- MongoDB
- Typescript
- npm
- Node.js
- Bootstrap
- PrimeNg

---

## **Contribution**

If you are looking to contribute the Employee Manager app, you can find its repo at https://github.com/JMan4342/Employee_Manager.

---

## **Questions**

If you have any questions, please feel free to reach out to me at manning.joseph.4342@gmail.com.