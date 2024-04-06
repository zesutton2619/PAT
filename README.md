# PAT

## Features

### Input Patent

The Patent that will be compared to the other patents stored can be inputted from the website.

### Patent Comparison Metrics to Measure Similarity

The text and context similarity scores are displayed in a visually appealing manner to determine patent infringement.

### Chatbot functionality

The explaination of the text and context similarity score is made with an OpenAI API and the bot is displayed and interacted with a message and text box which explains the similarity and possible infringement between the compared patents.

### Patent Comparison Viewer

The compared patents are displayed in-page for ease of manual comparison between the patents.

### Patent Comparison Database

Patents to be compared with the Inputted patent are stored in the server so the user can add adjust the patents that the inputted patents can be compared to.

### Patent Viewer / Manager

The patents inside the server can be displayed to manage the patent as well as an option to add more patents to compare towards the inputted patent to be compared.

## Team Contributors and Roles
Team Name: Night Owl
* Paulo Drefahl - Full Stack Developer
* Zach Sutton - Full Stack Developer
* Greggory Bateham - Front End Developer
* Kevin Kostage - Full Stack Developer

# Local Setup
### Backend Setup:

Refer to: https://github.com/zesutton2619/PAT/wiki/Patent-AI-Technology-(PAT)-API-Documentation

### Frontend Setup:

Refer to: https://github.com/zesutton2619/PAT/wiki/Patent-AI-Technology-React-App

### Docker
1. Clone the repository
2. CD to repository
3. CD to PAT Server
4. Change Dockerfile ENV variables
5. docker compose up --build

## Development

Frontend:
Adding additional Frontend interaction functions or fetches will be seemlessly added to the page when the changes are saved to the file.

Backend:
Adding additional Backend functions or routes will be seemlessly added to the server when restarted.

# Tech Stack

* HTML
* Tailwind
* JS
* Python
* React
* Node.js
* Flask
* Docker


## Other Resources

* Canva
* OpenAI API

## Security

Cross-Site Scripting (XSS) is a common security vulnerability found in web applications. It allows attackers to inject malicious scripts into content viewed by other users. For PAT, mitigating XSS risks involves implementing robust input validation and output encoding mechanisms. This ensures that any data entered by users, whether in the form of patent information or comparison queries, is sanitized before being processed or displayed. Employing Content Security Policy (CSP) headers can also significantly reduce the impact of any potential XSS attacks by restricting the sources from which scripts can be executed.

### Data Security

Data Security is ensured through the use of AES 128 encryption.

## Sustainability

PAT helps patent lawyers save non-renewable resources such as paper, electricity, and man hours when reviewing patents by saving time and direct resources.

## CI/CD Pipeline for Docker

## Deployment for Server

### How Docker Deployment Works:

## Privacy Policy

### Information Collection and Use

The Patents uploaded to be compared are not stored.

The Patents stored in the server are encrypted.

### Third-Party Services

The integration of OpenAI API highlights PAT's reliance on cutting-edge language processing capabilities to analyze patents. This API provides access to powerful models capable of understanding and generating human-like text, which PAT leverages to compare patents and explain the similarity scores. The usage of a third-party service like OpenAI API allows PAT to offer sophisticated explanations and insights that would be challenging to achieve with traditional programming methods alone. However, this also means that PAT must adhere to the terms of service and privacy policies set forth by OpenAI, ensuring that data shared through this API is handled responsibly.

### Changes to this Privacy Policy

Rights are Reserved to the Owners to update or change Privacy Policy of the product at any time. Any changes to the Privacy Policy will be reflected on this page. Users are recommended to check this page periodically for updates.

### Contact Us

If you have any questions or concerns about our Privacy Policy or PAT, please contact us at eaglehacks24@gmail.com
