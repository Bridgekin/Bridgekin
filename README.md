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
1. Copy the repo url (top right) to download via http. If you'd like, you can also download a zip.
2. Navigate to the folder that you would like to save the repo to. Once there, use ```git clone <url>``` to clone the repo
3. Get the master key. You can get it from the Bridgekin admin (either Joe or Lead engineer)
4. Once repo is open in your preferred IDE of choice, create a ```master.key``` directly within ```config```, with the actual master key

B. Run Repo

This app is build with 2 servers in development: 1) the frontend server, in the ```client``` folder and 2) the backend server
1. First, setup your databased by running ```rails db:setup```. This will create development and test databases, seed the databases, and create "schema_migrations" tables for each.
2. Next, run your backend server by running ```rails s```
3. In a seperate terminal tab, ```cd client```
4. Start server: ``` npm run start ```

C. More Setup

To continue running the app, you'll need to get Redis running, local cache, to house Sidekiq, job-scheduler which works on top of ActiveJob. Aside from basic installationof Redis/Sidekiq, there shouldn't be too many hiccups, but let me know if you have any questions.

You'll also need to setup ngrok, a program which exposes a public endpoint (locally), for our enrichment services like Full-Contact and Hunter. Both of these services use webhooks to relay data back. So, on the first call, you'll request information, and will get a response (200) which means they're processing this request. They'll then send the response (with requested information) back to the address you've specified (locally, this is an ngrok endpoint), for you us to then process.

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
 
