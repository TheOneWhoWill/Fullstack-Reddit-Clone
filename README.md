# Fullstack Reddit Clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start Server

First create a `.env` file with your mongodb api key using the variable name `MONGODB` once thats done head into the server directory and run `npm start` to setup the rest api on (http://localhost:2000) ["Port 2000"]

## Start Server

Go into the client directory, create another `.env` file for your firebase project credentials. The Acceptable variable names are as follows: `REACT_APP_API_KEY`, `REACT_APP_AUTH_DOMAIN`, `REACT_APP_PROJECT_ID`, `REACT_APP_STORAGE_BUCKET`, `REACT_APP_MESSAGING_SENDER_ID`, `REACT_APP_APP_ID`, `REACT_APP_MEASUREMENT_ID`. Then run `npm start` to complile the Front End. It should be running on (http://localhost:3000) ["Port 3000"]


**Make sure to have all the needed collections inside your mongodb database (Comments, Posts, SubReddits, and a Users collection)**
