
# EverEdu Mobile

## Overview
EverEdu Mobile is client developed specially for students' usage.

Students are able to use this application for

+ Enroll in a course
+ View course information---Announcement + Description
+ Take course attendance
+ Take and review quizzes
+ Present from mobile phone
+ Chat with others students and instructors in real time

This project is based on Ionic sidemenu skeleton. The backend is powered by Firebase with Angularfire.

## Setup
Install develop tool and library

```
npm install
bower install 
```

Local test

```
ionic serve
```

## Build
Build the project for specific mobile device

```
ionic platform add ios/android
ionic build ios/android
ionic emulate ios/android
```

## Known Issues
+ WebRTC is not working in WebView

## Credit
This project is built with following tools

+ [Angularjs] (https://angularjs.org/)
+ [AngularFire] (https://www.firebase.com/docs/web/libraries/angular/index.html)
+ [angularfire-seed] (https://github.com/firebase/angularfire-seed)
+ [Firebase] (https://www.firebase.com/)
+ [Ionic] (http://ionicframework.com/)
+ [Simple WebTRC] (http://simplewebrtc.com/)
+ [ui-route] (https://github.com/angular-ui/ui-router)
