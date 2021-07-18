# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Libraries Used:
  1.) Material UI -> To style and get Signup and Sign In templates for the application\
  2.) React Hook Form -> To create the forms and validate the forms. This library is enrich with the methods that are easy to use\
  3.) JWT -> To create the Auth Token\
  4.) Bcrypt -> To encrypt the password\
  5.) UUID -> To generate random Id for Meal\
  6.) Redux -> To manage the state of our application\
  7.) Mongoose -> To model the data and schema validation

## Available Scripts

In the project directory, you can run:

## STEPS TO SETUP THE PROJECT LOCALLY:
STEP 1.) Install node_modules with help of command npm install in root folder: `npm install` .

STEP 2.) Setup the database MongoDB locally.

          -- Your `localhost:27017` is the Mongo URL 
          -- Create Database called `tata_assignment` 
          
STEP 3.) Once you setup MongoDb then run the command `npm run server`.This command will connect your NodeJS to Database.

STEP 4.) For Frontend run the command `npm start`. This command will start your frontend at localhost:3000.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## FOLDER STRUCTURE :

 1.)`models` (Contains the Mongoose Schema for the User and UserMeals collection)
  - User.js [Contains the User Schema definition , Also encrypt the password before saving in DB and function to compare the password to authenticate user]
  - UserMeals.js [Contains the UserMeals Schema definition]
  
 2.)`public` (Contains favicon and index.html)
  - index.html [Contains application title , links for external libraries e.g Material UI fonts]

 3.)`src` (Contains application components and services and redux)
  - `components` (Contains all the components required for the application)
  
      1.) `Login` [Login Component for the application]\
            - `Login.js` --> Main file for the component\
            - `redux` --> Contains reducer , actions and types (types of actions required for Login component)
            
      2.) `Meals` [Meals Component for the application]\
            - `Meals.js` --> Main file for the component\
            - `AddEditMeals.js` --> Contains Forms to add or Edit the meals in a dialog box\
            - `MealsTable.js` --> Contains the table to list the meals\
            - `redux` --> Contains reducer , actions and types (types of actions required for Meals component)
            
      3.) `SignUp` [SignUp Component for the application]\
            - `SignUp.js` --> Main file for the component\
            - `redux` --> Contains reducer , actions and types (types of actions required for SignUp component)
           
  4.) `redux` (Contains the rootReducer and store js file)\
         - `rootReducer.js` --> Combines all the reducers \
         - `store.js` --> Contains the central store for our application
    
  5.) `service` (Contains the services required for our application)\
      - `httpService` --> Central service to post , get and delete data\
      - `history.js`  --> This file is used by browser to maintain the navigation history
     
  6.) `App.js` --> This file contains the routes defined for our application.
  
  7.) `AuthenticateRoute.js`  --> This file is a HOC which is used to pass Component and protect it by checking the AuthToken first
  
  8.) `middleware.js`  --> This file is used at backend to verify the JWT token for each api call
  
  9.) `server.js`  --> This file connects NodeJS with mongoDb and contains the routes for our application.
  
## Design Decisions:
 - First I started with setting up the register API and then connected this API to the frontend
 - Instead of creating and validating the form manually , I used Material UI teamplate and React Hook form to validate the form
 - Next task was to store the password in DB , As we can't store teh password as it is So I used bcrypt library to encrypt the password.
 - Then I created the API for Login.
 - Similar to Signup I used the Material UI Sign In template
 - After that I get the token from backend , In my previous project we were storing the data directly in browser cookie from backend by using httpOnly flag . I used the same technique and stored the token via httpOnly flag and append it with each request for meal via credentials:include key
 - After login we need to get the list of meals for a particular user . So I created the Model in such a way so that user and meals are mapped together . 
 - This meals API also verifies the Token if token is expired I redirect the user to login page
 - Similarly delete and edit meal are also authorized.
 
 ## Challenges:
 - The first challenge was to design everything by scratch i.e. forms and validation . So I searched for the templates and found Material Ui pre-build templates for Signup and Sign in and I had already used React hook form in my previous project. So I used it easily
 - I was facing issues when I wanted to prefill the AddEditMeal form. There was issue while setting default values and after searching for hours I finally found the solution.
 - I updated my backend Models So that mapping for meals and user and date can be done eaily. Earlier I was having Meals and User collection. Then I faced the issue when I had to show green and red color oon the basis of calories.
 - Showing the color was also a challenge and to be true I copied the logic to group the property of object and get sum on the basis of grouped value of array of object. 
 - I wanted to implement the logout as well but due to shortage of the time I wasn't able to add logout functionality.
