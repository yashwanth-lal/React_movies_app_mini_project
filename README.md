
# Movies Web App


This is a README file for the "Movies" web app, a video streaming platform inspired by Netflix. It allows users to watch films, explore trending movies, search for specific movies, and access their account information. The app incorporates various features such as authentication,explore page, movie details, pagination, and the ability to send emails.


## Screenshots

![App Screenshot](http://res.cloudinary.com/yash9676/image/upload/v1687326822/moviesAppMiniProjectCCBP/Screenshot_14_x5cre9.png)


## Tech Stack

The "Movies" web app is built using the following technologies:

**HTML:** Provides the structure for web pages.

**CSS:** Handles the styling and layout of the app.

**React.js:** A JavaScript library for building user interfaces.

**REST APIs:** Used for retrieving movie data from a server.

**Email.js:** Enables email sending functionality.

**Material UI:** A popular React UI framework that provides pre-built components and styling.

**JWT Token:** Used for authentication and authorization.


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


![Logo](https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png)


## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
  Run the app: npm start
```
    

### User Credentials


```text
 username: rahul
 password: rahul@2021
```

```text
  username: kapil
  password: moon$008
```


**You can use any one of the following credentials**
## 🛠 Skills
Javascript, HTML, CSS, React js


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yashwanth-lal/)



# Hi, I'm Yashwanth Lal! 👋


## 🚀 About Me
I'm a pursuing the full stack developer course from nextwave disruptive technologies,
I love making web apps 

## Features

- mobile view and desktop view
- Authentication 
- You can search the movies through keywords
- You can explore the movies through pagination
- The full details of the movie will be provided
- You can send the emails to the creator and you will get a auto reply
- You can view your account details in Account page


## Appendix

Once the app is up and running, users can perform the following actions:

Register a new account or login with existing credentials.
Explore the home page to discover trending and original movies.
Use the search functionality to find specific movies by entering keywords.
Click on a movie to view detailed information about it.
Navigate through the movie listings using the pagination feature.
Access the account page to manage user information.
Send emails to the app creator and receive an automatic reply.


## API Reference

**Trending Now Movies API**

#### API: `https://apis.ccbp.in/movies-app/trending-movies`

#### Method: `GET`

#### Description:

Returns a response containing the list of all movies

#### Get item

**Top Rated Movies API**

#### API: `https://apis.ccbp.in/movies-app/top-rated-movies`

#### Method: `GET`

#### Description:

Returns a response containing the list of all movies

**Originals API**

#### API: `https://apis.ccbp.in/movies-app/originals`

#### Method: `GET`

#### Description:

Returns a response containing the list of all movies

**Popular Movies API**

#### API: `https://apis.ccbp.in/movies-app/popular-movies`

#### Method: `GET`

#### Description:

Returns a response containing the list of all movies

#### API: `https://apis.ccbp.in/movies-app/movies/{movieId}`

#### Example: `https://apis.ccbp.in/movies-app/movies/92c2cde7-d740-443d-8929-010b46cb0305`

#### Method: `GET`

#### Description:

Returns a response containing the details of the movie

**Search Movies API**

#### API: `https://apis.ccbp.in/movies-app/movies-search?search={searchText}`

#### Example: `https://apis.ccbp.in/movies-app/movies-search?search=Venom`

#### Method: `GET`

#### Description:

Returns a response containing the list of movies and their movie names should includes the given searchText

