#Build Process

#Download the folder
-Place it in local web server like htdocs in apache
-open cmd to the path
-run npm install

do modifications in src folder

run npm build

dist folder will be created

go to localhost/yourfoldername/dist/

everytime you make a build dist folder will be recreated via gulp build tasks


1. Short outline of your approach and any assumptions made on the build task? 

Ans: As per the task listed in wireframe, the very basic setup is to build charts based on the csv provided, now this can be individual component or can be embedded into existing application ecosystem. 
The Flow Diagram is as follows: 
Raw Data from CSV --> Access CSV Data --> Process data based on business logic --> provide formatted data as input to the required chart type--> render the chart. 
The final output is shown using D3 Library in form of Pie, Horizontal Bar graph and line graph. 
Vanilla JS/ D3 native methods are used. 

2. Explain how would you host the page and which technologies and frameworks you would use 
Give reasons for your choices. 

Ans: Given the time constraint and after understanding the wireframe, html 5 boilerplate was used and gulp was used a build tool to be up and running as quickly as possible, but if the app were to be made I would have first taken time to understand the current business flow/use cases and how much deviation the business needs in terms of features. 
I would go for Angular based application where each chart type could be made as a individual component and can be reused anywhere in the whole application. Now with that we can leverage as much as feature like routes, components, faster load time and we can to better serve the business future as well as current business needs like low turn around time for developing a component with least errors. 
Build tasks over node/npm like gulp with browserify could be used which will give the minified output in a output folder for the production environment with all the resolved dependencies and can make our application scalable for future dependencies 
The reason to choose this is to streamline the development process in multi developer environment and we can write test cases on top of it to ensure that we have maximum coverage with the most standard readable and future maintainable code with our team.

3. Briefly describe how you structure and scale your webpage if more content was to be added. 

Ans: Well begun is half done, this applies when we are planning our app, how we setup our app folder structure, naming convention of files, styles, and focus to quickly build the tasks is more important for an app to be scalable/maintainable. As mentioned in the previous answer rather than making charts available for one type of setup and page, we should go for component based development which can be either a single chart type or a group of chart types who have their own css/html and chart logic in place, just we need to provide data to the component (be it from any RESTful service/api or may be a rss feed) the final output will be rendered flexibly on any page we want. 
 