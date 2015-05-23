# Everedu
[Instructor Client Demo] (http://xuefeng-zhu.github.io/Everedu/instructor)

[Student Client Demo] (http://xuefeng-zhu.github.io/Everedu/student)


## Overview 
Everedu is a helpful education application. Its objective is to improve the lecture engagement and interaction between instructors and students. Everedu includes a web application for instructors and a mobile application for students. 

The main features of this application include

+ Take lecture attendance
+ Pop quiz during the lecture to exam learning effectiveness
+ Reply questions or present through WebRTC
+ A chatting room allowing students asking questions during lecture

## Deployment
Modify following code in `js/services/firebase.utils`

```
angular.module('firebase.utils', ['firebase'])
    .constant('FBURL', 'https://everedu.firebaseio.com/')
```
Set the FBURL to your own [Firebase](https://www.firebase.com/) instance

Host the site on Github Page or Firebase Host

## Development tools
+ Angularjs for front-end user interaction 
+ Ionic for building cross platform mobile application
+ Firebase for backend service 
	
## Future Plan
+ Collaboration on course note
+ Save quiz or note to Evernote
+ Discussion Forum
