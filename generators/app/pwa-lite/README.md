PWA Lite
========
[TOC]

Performant PWA Lite, simple Yeoman generator for a bare basic ultra lite PWA structure. PWA 
means WebComponents, Service Workers, ES6 Modules, Static/Dynamic Imports. 

## Menu Items
The Menu items and the page to route connected to the Menu items are define in the file 
**menu-items.js**. Here you can define your own menu items, tabs name to route in your 
web content, keep in mind to rename the default : 

+ home 
+ one
+ two
+ three
+ four

in the **menu-items.js** file according with the name of the pages defines, page home is not 
lazy loaded but is defined and loaded in the main application file! For other page files follow
name rule : 

+ one (name)  >  page-one.js
+ two (name)  >  page-two.js
+ three (name)  >  page-three.js
+ four (name)  >  page-four.js
...

Only the home page (app-home.js) is defined and loaded with the main application element, 
the other pages are lazy loaded. 


## ServiceWorker

## images
Check in the /images folder to get more details.

## .gitignore
The .gitignore file is set to ignore :

+ /node_modules
+ /build