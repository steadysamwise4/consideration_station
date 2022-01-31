# consideration_station    ![license badge](https://img.shields.io/badge/License-MIT-<green>)


## Description
A back-end for an imaginary social media app where users can share their thoughts - set up using MongoDB,Mongoose,Express.js, and Node.js. Boot camp challenge.

  
## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [References](#reference)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Description <a name="description"></a>
<sub>_***Built With:***_</sub> <sub>JavaScript,ES6,Node.JS,Express.JS,MongoDB,Mongoose</sub> </br>
This project is a backend setup only. It was done for a boot camp challenge in order to learn the ins and outs of a noSQL database, in this case MongoDB. It was fairly straight forward. I had fun manipulating the api routes to get the exact functionality that I wanted. For example, I discovered that when a friend was added to a user, and then that friend was deleted, the id number remained in the original users friends array. I changed the api route to find all users who had that user as friends and delete the record when the user was deleted. Overall I found MongoDB quite a bit easier and more flexible than MySQL. I can definitely see the advantages to both types of database and would welcome working with and learning more about either or both in the future.

## Installation <a name="installation"></a>
clone the repository. run the command' npm i' in order to install the dependencies from npm.

## Usage <a name="usage"></a>
 run 'npm start' to start the server. From that point you should be able to test the routes in insomnia as is demonstrated in the demo videos. 
![screenshot of app being tested in insomnia](/public/images/screenshot.png)
[demo video 1](https://watch.screencastify.com/v/Hl3DauLlXz7C2gVsBUER) </br>
[demo video 2](https://watch.screencastify.com/v/4dpyi4w11nOzfhMNPt54)

## License <a name="license"></a>
[MIT](/LICENSE)

## References <a name="reference"></a>
None

## Contributing <a name="contributing"></a>
[Contributing Guidelines](/docs/contribute.txt)

## Tests <a name="tests"></a>
N/A at this time

## Questions <a name="questions"></a>
Contact: Sam Davenport </br>
https://github.com/steadysamwise4 </br>
davenportsam44@gmail.com
    
