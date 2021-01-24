# Media Store - MERN

## Description
  An e-commerce platform media-shop that sells different products online using  GraphQL API built with Apollo Server.The app was built using the MERN stack, with a React front end, MongoDB database, and Node.js/Express.js server and API. This application also implements state-management (redux) and offline capabilities using service workers, local storage and IndexedDB. We all use Googles sign-in OAUTH application in order to manage the authentication.

  Application uses Redux to implement state-management. 
## Table of Contents
 - [Description](#description)
 - [User Story](#user-story)
 - [Acceptance Criteria](#acceptance-criteria)
 - [Screenshots](#screenshots)
 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Contributing](#contributing)
 - [Deployment URL](#Deployment-URL)
 - [GitHub Repo URL](#GitHub-Repo-URL)
 - [Author](#author)
 - [Tests](#tests)
 - [Questions](#questions)

## User Story
AS AN avid reader, gamer or movie buff
I WANT to search for new movies, books and games 
THEN  I am presented with a menu with the options Search for books,games and movies and Google Login and an input field to search and a submit button
WHEN I click on the Search menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, including title, description, image, and a price 
WHEN I click on the Google Login menu option
THEN I am redirected to Google's sign-in screen using google's authentication process
THEN my user information is stored if it's the first time the user has logged into the application with that email 
WHEN I am logged into the site
THEN my menu options in the navigation bar change to show logout and order history
WHEN I am logged into the site and search for a product
THEN I will see the results of the search including the title, description and price
WHEN I see all the different products (as a result of search or otherwise)
THEN I should have the option to buy the product and/or bid (auction) for the product
WHEN I click on buy
THEN the prouduct gets added to the cart for checkout
WHEN I click on the cart
THEN I have the option to go back, remove item from cart or checkout 
WHEN I click on checkout 
THEN I can buy the product via Strip using one of the supported payment methods
WHEN I have completed the purchase via Stripe
THEN I am redirected to the home page for the logged user
WHEN I submit a bid value
THEN I am automatically part of a time limited auction where the highest bidder wins the product
WHEN I win the auction
THEN the product will showup in order history and a Message is created that can be accesed via the message option show in the NAV Bar
WHEN I click on the message option in the NAV Bar
THEN I can see all the auction bids that I have won
WHEN I loose the auction
THEN nothing happens and user continues using the website
WHEN I click on logoff
THEN I am logged out of  the website and presented the home page including search and infomration about the products and NAV bar shows the option to login

## Acceptance Criteria

## Screenshots
![Movies](./movies.jpg)
![Books](./books.jpg)
![Games](./games.jpg) 

## Installation
 Application is deployed on Heroku. 
 Hopwever if you want to explore the repository, please go ahead and clone or download the repository provided in the link (please see under questions).  A package.json file will be available . This will make it easy to manage and install the required packages for this program to work. . “npm install” command from the terminal will trigger the installation of all modules that are listed as dependencies in package.json.

 ## Usage
  Please user story above for full details. 
  In summarty, application provides the ability to do the following: 

    Signup or Log into the application
    Select product category and search for different digital products (focused on books, video games and movies)
    Add or remove a product from the cart.
    View and manage the shopping cart
    Checkout and pay using Stripe APIs (not an actual payment -- test mode)


  ## License
   ![](https://img.shields.io/badge/License-ISC-blue.svg)
  
  [ISC](https://opensource.org/licenses/ISC)

  URL: https://opensource.org/licenses/ISC

## Deployment URL
https://floating-badlands-78581.herokuapp.com/


## GitHub Repo URL
https://github.com/gtankha/media-store

## Contributing
  Please feel free to contribute. However, please send a note to the email address below informing us of the contribution

## Test
  Validation is perfomed to ensure that data is not empty. Additionally, only authenticated users can access functions such as shopping cart and payments

## Questions
Have questions? Contact the Authors. 

### Authors
* [Marco Evangelista](https://marcobjj.github.io/react-portfolio/) - [GitHub](https://github.com/marcobjj?tab=repositories)
* [Ann-Marie Orozco](http://ann760.github.io/developer-portfolio) - [GitHub](https://github.com/ann760)
* [Gautam Tankha](https://gtankha.github.io/portfolio_react/) - [GitHub](https://github.com/gtankha?tab=repositories)
  



