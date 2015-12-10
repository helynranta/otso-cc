# Otso Codecamp Winter 2015 group 4
App is running here: https://ide.c9.io/lasshi/otso-cc

# Team members
Otto Laitinen  
Lassi Lääti  
Anna Osipova  

# Idea
Local IT company LTC Otso provided us with a case that we had to solve. They had a few criteria what they wanted to see, and we planned to implement them all, since we felt quite confident in our programming skills. We also wanted to make our final application completely functional, with real client - server communication.

# Features
In the end we were able to implement all of our planned features, with some extra aswell. We have functionality for basic customers, subcontractors and manufacturers. The basic logic of the application is that a manufacturer can make an order and assign it to chosen subcontractors. After the work is done, a custom feedback link is sent to the customer as an email, and the given feedback is connected to the relative subcontractor. After this loop has ran a few times, the manufacturer can review their subcontractors based on feedback. Manufacturers can also sort their subcontractors in different orders, to see e.g who has the best ratings.

# Screen shots

# Technology
Server uses node.js REST architecture, and all data passed between client and server are pure JSON. Also numerous node modules are used, like Express and Jade.
Client is based on HTML5 principles (JavaScript, jQuery, Ajax-calls) and ReactJS is used for making the client look like a native mobile application

webpack -w to rebuild bundle.js on js changes
