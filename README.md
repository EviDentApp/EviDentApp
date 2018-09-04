# About

This GitLab repository contains source code for the front-end and back-end of the Evidence-based App (EBApp). The objective of the EBApp is to display scientific texts to users. The texts are all related to dentistry topics.

The development team is comprised of both undergraduate and graduate students from the University of São Paulo. The code for this mobile application is available as open source. The application was developed using the Ionic Framework, specifically version 4.1.1.

At the time of writing, the Ionic Platform Documentation v4 beta can be accessed through the following link:
> https://beta.ionicframework.com/docs

## Pre-requisites

Run the following commands in the Linux terminal to make sure you have the required software to install Ionic:

<b>NodeJS:</b>
> node -v

<b>npm:</b>
> npm -v

<b>Cordova:</b>
> cordova -v

For documentation purposes, we used NodeJS 8.11.4, npm 6.2.0, and Cordova 8.0.0. In case you do not have any of the aforementioned software, the following subsections provide explanations on how to install them.

### Install NodeJS and npm

> sudo apt-get install curl python-software-properties

> curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

> sudo apt-get install nodejs

### Install Cordova and Ionic

> npm install -g ionic cordova

## Start an Ionic app

> ionic start <project-name> <project-type> --type=angular

Common project types are:

- blank
- tabs
- sidemenu

<b>Important!</b> When running the command, a message may prompt the user for input:

- Integrate your new app with Cordova to target native iOS and Android? <b>yes</b>
- Install the free Ionic Pro SDK and connect your app? <b>no</b>

## Run an Ionic app

Run the following command in the project directory:

> ionic serve

We strongly recommend using the Google Chrome web browser for running an Ionic app. Google Chrome can be downloaded from this website:
> https://www.google.com/chrome/

# Logs

29th of August- 10:00 to 12:14
 - We decided to use Ionic 4.
 - Tabs will be used in order to offer portability in our app.
 - GitLab repository created.
 - Preliminary version of the login page created.
 - Created an Ionic project 3 times.
