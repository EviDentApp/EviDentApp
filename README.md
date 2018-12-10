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

* If you are using Debian 9, the following tutorial might be useful in case of trouble:
> https://medium.com/collabcode/como-instalar-node-js-no-linux-corretamente-ubuntu-debian-elementary-os-729fb4c92f2d

### Install Cordova and Ionic

> npm install -g ionic cordova

## Install dependencies

Run the following commands in the Linux terminal, replacing PROJECT-DIRECTORY with its respective tag:

> cd PROJECT-DIRECTORY

> npm install

## Run an Ionic app

Run the following commands in the Linux terminal, replacing PROJECT-DIRECTORY with its respective tag:

> cd PROJECT-DIRECTORY

> ionic serve

We strongly recommend using the Google Chrome web browser for running an Ionic app. Google Chrome can be downloaded from this website:
> https://www.google.com/chrome/

## Run an Ionic app with docker

Run the following command in the Dockerfile directory to build the container and image:

> sudo docker build -t ionic .

Run the following the command in the Dockerfile directory to run the image, replacing LOCAL-DIRECTORY with the complete location of the ionic source files:

> sudo docker run -p 8100:8100 -v LOCAL-DIRECTORY:/app ionic


# License

Logotype made by Eucalyp from www.flaticon.com (Licensed by CC 3.0 BY).