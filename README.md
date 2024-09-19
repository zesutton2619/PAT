# Patent AI Technology (PAT)
PAT is an advanced AI-powered tool designed to revolutionize patent analysis for attorneys and legal professionals. By leveraging cutting-edge algorithms and machine learning techniques, PAT provides comprehensive similarity assessments between patents, highlighting potential overlaps and infringements. With its intuitive interface and powerful backend, PAT streamlines the patent comparison process, offering detailed reports and AI-powered explanations.

## **Live Demo:**

\[![Watch the demo video](https://img.youtube.com/vi/JKMDyak8ET0/0.jpg)]  

(https://www.youtube.com/watch?v=JKMDyak8ET0)

## Table of Contents
- [Features](#features)
- [Comparison Types](#comparison-types)
- [Comparison Algorithms](#comparison-algorithms)
- [Team Contributors and Roles](#team-contributors-and-roles)
- [Local Setup](#local-setup)
- [Tech Stack](#tech-stack)
- [Security](#security)
- [CI/CD Pipeline](#cicd-pipeline)
- [Privacy Policy](#privacy-policy)
- [Contact Us](#contact-us)

## Features

1. **Input Patent**
   * Users can upload patents via the website to initiate comparisons.

2. **Patent Comparison Metrics**
   * PAT provides a detailed, visually intuitive report on the text and context similarity scores between patents to help assess patent infringement risks.

3. **Chatbot Functionality**
   * PAT includes a chatbot, powered by OpenAI, that explains the comparison results. The chatbot breaks down the similarities between patents, making it easier to understand potential overlap and infringement.

4. **Patent Comparison Viewer**
   * Users can view the compared patents side-by-side for manual inspection.

5. **Patent Comparison Database**
   * PAT includes a local database where users can upload and manage patents that the system compares against the input patent.

6. **Patent Viewer/Manager**
   * PAT also allows users to manage the patents stored on the server, adding or removing documents for comparison.

## Comparison Types

PAT offers two primary modes of patent comparison:

1. **Direct Compare**
   * This mode allows users to compare two specific patents against each other.
   * Ideal for focused analysis when investigating potential infringement between known patents.
   * Provides a detailed breakdown of similarities in syntax and context between the two documents.

2. **General Compare**
   * This mode compares an input patent against the entire database of stored patents.
   * Useful for broad searches to identify potential infringements or similar patents across a large corpus.
   * Results are ranked by similarity, allowing users to quickly identify the most relevant matches.

Both comparison types utilize the same underlying algorithms for syntax and context analysis, ensuring consistent and reliable results regardless of the comparison mode chosen.

## Comparison Algorithms

PAT employs a two-pronged approach to patent comparison, combining syntactic and contextual analysis:

1. **Syntax Comparison**
   * Utilizes advanced text processing techniques to analyze the structural similarities between patents.
   * **Cosine Similarity**: This algorithm compares the word vectors of patents, providing a numerical measure of textual similarity regardless of document length.
   * **TF-IDF (Term Frequency-Inverse Document Frequency)**: Used in conjunction with cosine similarity to weight the importance of words based on their frequency in the document and rarity across the patent corpus.

2. **Contextual Comparison**
   * Leverages state-of-the-art Language Models (LLMs) to understand the semantic meaning and context of patent language.
   * Using a local LLM for more security and privacy with the desktop version and an OpenAI API service for the web version. 
   * **Sentence Transformers**: Used to compute semantic similarity between patent sections, identifying conceptual overlaps that might not be apparent from syntax alone.

The combination of these approaches allows PAT to provide a comprehensive similarity analysis, capturing both the literal and conceptual similarities between patents.

## Team Contributors and Roles

**Team Name:** Night Owl

* **Paulo Drefahl** – Full Stack Developer
* **Zach Sutton** – Full Stack Developer
* **Gregory Bateham** – Front End Developer
* **Kevin Kostage** – Full Stack Developer

## Local Setup

### Backend Setup:
Refer to: [PAT API Documentation]

### Frontend Setup:
Refer to: [PAT React App Documentation]

### Docker Setup:
1. Clone the repository
2. Navigate to the repository: `cd <repo>`
3. Navigate to PAT Server: `cd PAT-Server`
4. Update the Dockerfile environment variables
5. Build and start Docker: `docker compose up --build`

## Tech Stack

* **Frontend**: HTML, Tailwind CSS, React, JS
* **Backend**: Python, Flask, Node.js
* **Deployment**: Docker, AWS
* **Additional Tools**: OpenAI API, Canva
* **Machine Learning**: TensorFlow, PyTorch, Hugging Face Transformers

## Security

**Cross-Site Scripting (XSS) Prevention:**
* PAT mitigates XSS risks by implementing input validation and output encoding. A Content Security Policy (CSP) is used to restrict the execution of scripts from untrusted sources.

**Data Security:**
* PAT uses AES-128 encryption to ensure the security of all patents stored on the server.

## CI/CD Pipeline

* Docker is used to automate and streamline the deployment of PAT's backend and frontend services.

## Privacy Policy

### Information Collection and Use
* PAT does not store any uploaded patents permanently.
* Any patents stored in the server are encrypted.

### Third-Party Services
* PAT leverages the OpenAI API for sophisticated language processing to compare patents and explain similarity scores.

### Changes to this Policy
* We reserve the right to update the privacy policy at any time. Users are encouraged to review the policy periodically.

## Story of PAT
PAT was inspired by Arthrex, a world-renowned company specializing in medical prostheses and patents within the medical field. They sought a patent comparison software that could function both as a web service and locally. By understanding and addressing their needs, our team developed a solution in just one week, earning us second place in the hackathon, where we competed against numerous other innovative projects.

## Contact Us
For any inquiries regarding PAT or the privacy policy, contact us. 
