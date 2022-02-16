# Uptime-Monitor
Uptime monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.
## Getting Started

These steps will get you a copy of the project up and running for development and testing purposes.

## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Install  **mongoDB** _latest stable version_
4.  Install  **redis** _latest stable version_
5. _Optional Step_ ⇒ You can install **MongoDB Compass** [any user interface application for MongoDB] as it offers a user interface for dealing with the database
6.  Clone the Project
7.	Run the following commands:
	```
	npm install
	cp .env.example .env
	```
8. write required variables in .env

## Usage

1. for running localy
  ```
  npm run start
  ```
2. for testing
  ```
  npm run test
  ```
3. for build
  ```
  npm run build
  npm run start:prod
  ```
## Documentation
_go to /api/v1/documentation_
## Built With

[Nodejs](https://nodejs.org/en/)
