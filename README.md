# Bridgekin
Changing the way we connect with our network!

## V2
## Problem
Sales teams don't have a easy way to tell who their teammates know. Understanding the impact of warm introductions, sales teams prioritize a connection through a teammate in order to drive sales

## Solution
Build a social graph of a team's contacts by enriching contact upload from sources like LinkedIn, Gmail, etc (future).

## Getting Started
Before setting up the repo, make you've installed the latest versions of ruby and rails for backend, and npm (or yarn) for frontend, locally.

A. Setup Repo
1. Download the repo at the top right
2. Unzip and save the repo
3. Get the master keycode. You can get it from the Bridgekin admin (either Joe or Lead engineer)
4. Once repo is open in an ide, update the config >> master.key file with the actual master keycode

B. Run Repo
This app is build with 2 servers in development: 1) the frontend server, in the ```client``` folder and 2) the backend server
1. First, setup your databased by running ```rails db:setup```. This will create development and test databases, seed the databases, and create "schema_migrations" tables for each.
2. Next, run your backend server by running ```rails s```
3. In a seperate terminal tab, ```cd client``
4. Start server: ``` npm run start ```

## V1
## Problem
Business professionals have no transparency into the opportunities and trusted peers in their network

## Solution
An invite only platform where business professionals post, view and connect exclusive business opportunities within their trusted network and member associations. 

## Technologies used
- React/ Redux
- Ruby on Rails
- Material UI.
- Devise for authentication
- Pundit for authorization
 
