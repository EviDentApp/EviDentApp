# About

This GitLab repository contains source code for the front-end and back-end of the Evidence-based App (EBApp). The objective of the EBApp is to display scientific texts to users. The texts are all related to dentistry topics.

The development team is comprised of both undergraduate and graduate students from the University of São Paulo. The code for this mobile application is available as open source. The application was developed using the Ionic Framework, specifically version 4.1.1.

At the time of writing, the Ionic Platform Documentation v4 beta can be accessed through the following link:
> https://beta.ionicframework.com/docs

## Pre-requisites

Run the following commands in the Linux terminal to make sure you have the required software to install Ionic:

<b>NodeJS:</b>
> node -v

Currently using NodeJS v12.13.0.

<b>npm:</b>
> npm -v

Currently using NPM 6.12.0.

<b>Cordova:</b>
> cordova -v

Currently using Cordova 9.0.0 (cordova-lib@9.0.1).

<b>Ionic:</b>
> ionic -v

Currently using Ionic 5.4.9

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

* Install Android SDK -- we strongly recommend to use Android Studio for configuration.

https://www.mathworks.com/help/supportpkg/android/ug/install-android-sdk-platform-packages-and-sdk-tools.html

* Get your machine IP

* Run API project binding to the address:

```
FLASK_APP=api flask run --host=<ip>
```

* Change `endpoint` variable in `requisitions.service.ts` to use the IP

* Plug in a mobile device and run (make sure developer options and USB debugging
  is enabled on device):

```
ionic cordova run android
```

* Debugging

Run:

```
ionic cordova run android -l --debug
```

Inspecting with Google Chrome:
https://developers.google.com/web/tools/chrome-devtools/remote-debugging

## Run tests

First, run API project on localhost.

> npm test

## Run an Ionic app with docker

Run the following command in the Dockerfile directory to build the container and image:

> sudo docker build -t ionic .

Run the following the command in the Dockerfile directory to run the image, replacing LOCAL-DIRECTORY with the complete location of the ionic source files:

> sudo docker run -p 8100:8100 -v LOCAL-DIRECTORY:/app ionic

## Pendencies

* `login.page.html`: Facebook login is commented out. Facebook account is evidentappdevelopers@gmail.com. Need to configure account for login.


# License

Logotype made by Eucalyp from www.flaticon.com (Licensed by CC 3.0 BY).
