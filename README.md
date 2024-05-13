# BUTTERFLY_7

## Program Directory

- [ ] [Backend](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Backend?ref_type=heads)
    - [ ] [Controller](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Backend/src/main/java/com/butterfly/controller?ref_type=heads)
    - [ ] [Entity](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Backend/src/main/java/com/butterfly/entity?ref_type=heads)
    - [ ] [Repository](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Backend/src/main/java/com/butterfly/repository?ref_type=heads)
    - [ ] [Service](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Backend/src/main/java/com/butterfly/service?ref_type=heads)
- [ ] [Frontend](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Frontend?ref_type=heads)
    - [ ] [Javascript](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Frontend/my-app/src/pages?ref_type=heads)
    - [ ] [CSS](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Frontend/my-app/src/css?ref_type=heads)
- [ ] [Documents](https://git.las.iastate.edu/SeniorDesignComS/2024spr/butterfly_7/-/tree/main/Documents?ref_type=heads)


***

## Name
Butterfly Longevity Project

## Description
A web application used to track the lifespan of butterflies. This is accomplished by tagging each tracked butterfly with a physical sticker on their wings that has a designated alphacode on it. Researchers (classified as Admins) use the web app to register each individual butterfly recording its species and its alphacode. These registered butterflies are then let out into an enclosure where they spend the rest of their lifespans flying around in. Visitors (classified as Docent and Public) can then visit these enclosures and report sightings of these butterflies by reading their alphacode and typing them into the web app. The data collected includes the date the butterfly was registered, the species of the butterfly (both common and scientific names), the date the butterfly was last reported, the number of times the butterfly was reported, if the butterfly is alive or dead, and the date the butterfly died. Using the collected data, admins can generate a report of the collected data based on parameters set by the admin. This allows the admin to view the collected data in a comprehensive format that can be used in presentations in the future.

## Installation
How to Setup Server
1) Login to AWS EC2 instance using AWS permission key (will need to regenerate a key and reassign if needed)
    - Command: ssh -i ReimanLongevityKey.pem ec2-user@ec2-3-137-208-248.us-east-2.compute.amazonaws.com


2) Stop the current nginx frontend server
    - Command: sudo systemctl stop nginx

3) Stop the current backend server
    - Command: sudo systemctl stop springServer

4) Make sure the java springboot application.properties url is pointed to the right database
    - spring.datasource.url=jdbc:mysql://logevitydatabase.clfwwirs6cmp.us-east-2.rds.amazonaws.com:3306/butterflyDB

5) Cd into the current frontend (...\butterfly_7\Frontend\my-app) on local computer

6) Run npm run build

7) Copy frontend files to ec2 instance
    - Command: scp -r -i ReimanLongevityKey.pem Frontend/build/ ec2-user@ec2-3-137-208-248.us-east-2.compute.amazonaws.com:~

8) Cd into the backend folder

9) Run mvn clean package

10) Cd into the target folder

11) Copy backend jar into ec2 instance
    - scp -r -i ReimanLongevityKey.pem Backend/target/springboot-demo-1.0.0.jar ec2-user@ec2-3-137-208-248.us-east-2.compute.amazonaws.com:~

12) Login to AWS EC2 instance using AWS permission key (will need to regenerate a key and reassign if needed)
    - Command: ssh -i ReimanLongevityKey.pem ec2-user@ec2-3-137-208-248.us-east-2.compute.amazonaws.com

13) Restart the backend:
    -   Command: sudo systemctl restart springServer
    - Note: This uses a service script I wrote

14) Restart the frontend nginx sever
    - Command: sudo systemctl restart nginx


## Usage
Public & Docent Usage
1) Click the public box
2) Go to the [website](Longevity-Reiman (ec2-3-137-208-248.us-east-2.compute.amazonaws.com)
3) Click the login textbox, type in a username and click login
4) Click the + icon
5) Click the text box and enter in the 3 digit code you see on the butterfly and click submit
6) Click submit another butterfly to repeat the process

Admin Usage
1) Click the public box
2) Go to the [website](Longevity-Reiman (ec2-3-137-208-248.us-east-2.compute.amazonaws.com)
3) Click the login textbox, type in the admin username and admin password and click login


Admin Add Species
1) Click add species
2) Type in species you wish to add
3) Click submit

Admin Report
1) Click the + icon
2) Click the text box and enter in the 3 digit code you see on the butterfly and click submit
3) Click submit another butterfly to repeat the process

Admin Manage Data
1) Click access database
2) Click edit data for the entry you wish to edit
3) Alter any existing data for the selected butterfly
4) Click submit
5) Can click export to csv to export to csv

Admin Register Butterfly
1) Click register butterfly
2) Select month day year (optional)
3) Select number of butterflies to use between 1-4
4) Enter in Alphacode in left entry field, select butterfly species from dropdown
5) Repeat for all chosen butterflies
6) Click submit

Admin Generate Report
1) Click generate report
2) Select the radio button for the type of report you wish to generate
3) Fill out any available fields
4) Click submit
5) Click export to csv to export current report to csv

## Support
Contact Nathan Brockman at mantisnb@iastate.edu

## Roadmap
Have public/docents be able to mark a butterfly as dead
Expand Generate Report parameters
Store more data about individual butterflies

## Authors and acknowledgment
Richard Bach
Joseph Jennings
Tze Yik Ong
On Wave Tiong
Kaden Wehrenberg

## Instructors
Client: 
Nathan Brockman & Reiman Butterfly Gardens

Instructor:
Simanta Mitra, Ph.D.

TAs: 
Eshita Zaman
Md Mahbubur Rahman
Md Rayhanul


## Project status
Project is currently complete for the purposes of Iowa state’s senior design class.
No further work on the project will be done by the authors listed above.

