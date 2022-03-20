# CHANGELOG

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a Changelog](http://keepachangelog.com/).


## Unreleased
---

### New

### Changes

### Fixes

### Breaks


## 0.1.2 (2022-03-16)
---

### Fixes
FA-34: Editor-Fix the <select/> to assume 1st <option/> value on Create.
FA-34: Fix the case of Formnik, <Select/> and the Promises like FoodMomentsSelect.
FA-59: Fix when session is timeout, save the current URL and after login, redirect to it.
Fix Uncaught ReferenceError: process is not defined.
Fix the DEBUG env var reading renaming it to REACT_APP_DEBUG.
Fix listing screen `lost the resultset` when returns from data screen with child components.
Fix the 'token is invalid' change issue.
If API returns the 'token expired' message, it'll be reported as 'Session expired'.

### Changes
FA-58: "restart: unless-stopped" to the VPS docker compose configuration to let the containers stay active on server reboots.
Rename authentication.service to db.authentication.service.
Get URL parameters enhanced by getUrlParams() new function.
Update `CHANGELOG.md` and `version.txt` files.
Comment almost all the console_debug_log.
DB Util: convertId() accepts null and blanks.

### New
FA-33: Editor FE: add child listing to the edit screen
Editor FE: child listing not showed on Create action.
Generate UsersFoodTimes select options from component FoodMomentsSelect.
FA-61: Editor FE: turn generic the select component FoodMomentsSelect
FA-6: Create menu option and editor for food_moments.
Enable UserHistory child listing to Users' option.


## 0.1.11 (2022-03-10)
---

### New
Preview version with initial deployment of BE (Backend) and FE (Frontend) of Fynapp webapp.
Implements FA-1, FA-2, FA-3, FA-13, FA-14, FA-15, FA-16, FA-17, FA-18, FA-21, FA-22, FA-23.
Release notes:
Start programming of the generic editor.
FA-1: Start the unit test development with the Users table.
FA-2: Endpoint for Users table.
FA-3: Create a pipeline to build and deploy the backend to a docker container in a Linux VPS.
FA-13: Create a develop branch and start using it with good SDLC practices.
FA-14: Add JWT bearer security to the backend.
FA-15: Create endpoints and unit test for user login.
FA-16: Start FE development by implementing login page and JWT bearer/token.
FA-17: Create CRUD for users on the FE. Enhanced and extended top menu, Users list with bootstrap and fontawesome, initial CRUD layout.
FA-18: Create a pipeline to build and deploy BE & FE on Heroku.
FA-21: Recover local I5 y/o Celeron server and install Centos 7.
FA-22: Install and configure Kubernetes on the local server and perform a spike the evaluate using this technology.
FA-23: Build a docker image in a Gitlab pipeline by install a Gitlab runner.