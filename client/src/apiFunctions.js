import JSZip from "jszip";

let chatMessages = []; // State to hold chat messages


/**
 * Format a file path into a File object.
 * @param {string} filePath - The path of the file to format.
 * @returns {Promise<File>} A promise that resolves with the formatted File object.
 */
export const formatPlaceholder = async (filePath) => {
    return new Promise((resolve, reject) => {
        // Create a new FileReader instance
        const fileReader = new FileReader();

        // Define a callback function to handle the FileReader onload event
        fileReader.onload = (event) => {
            try {
                // Create a Blob object from the file content
                const fileBlob = new Blob([event.target.result]);

                // Create a File object from the Blob and file path
                const file = new File([fileBlob], filePath.split('/').pop());

                // Resolve the promise with the File object
                resolve(file);
            } catch (error) {
                // Reject the promise if an error occurs
                reject(error);
            }
        };

        // Define a callback function to handle the FileReader onerror event
        fileReader.onerror = (event) => {
            // Reject the promise with the error
            reject(event.target.error);
        };

        // Read the file as an ArrayBuffer
        fileReader.readAsArrayBuffer(filePath);
    });
};

/**
 * Extract files from a ZIP file.
 * @param {Blob} zipFile - The ZIP file to extract files from.
 * @returns {Promise<File[]>} A promise that resolves with an array of extracted File objects.
 */
export const unzipFile = async (zipFile) => {
    const zip = await JSZip.loadAsync(zipFile);
    const patents = [];

    for (const filename of Object.keys(zip.files)) {
        const file = zip.files[filename];
        if (!file.dir) {
            const fileBlob = await file.async('blob');
            const fileObject = new File([fileBlob], filename);
            patents.push(fileObject);
        }
    }

    return patents;
};

/**
 * Remove a ZIP file from the server.
 * @returns {Promise<void>} A promise that resolves when the ZIP file is successfully removed.
 * */
export const removeZipFile = async () => {
    try{
        const response = await fetch('http://localhost:5000/remove_zipfile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log("Successfully removed zip file");
        } else {
            console.error('Failed to remove zip file:', response.statusText);
        }
    }
    catch(error){
        console.error('Error retrieving patents:', error);
    }
}

/**
 * Upload patent files to the server.
 * @param {FileList} files - The list of patent files to upload.
 */
export const uploadPatent = async (files) => {
    try {
        console.log("Files:", files);
        console.log("Files length:", files.length);
        console.log("Files type:", typeof files);

        if (files && files.length > 0) {
            const formData = new FormData();

            // Convert files to an array
            const filesArray = Array.from(files);

            filesArray.forEach((file, index) => {
                console.log(`File ${index}:`, file);
                formData.append(`file${index}`, file);
            });

            for (const key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }

            const response = await fetch('http://localhost:5000/upload_patent', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('File(s) uploaded successfully');
            } else {
                console.error('Failed to upload file(s)');
            }
        } else {
            console.error('No files provided');

        }
    } catch (error) {
        console.error('Error uploading file(s):', error);
    }
};

/**
 * Compare patents on the server.
 * @param {boolean} [directComparison=false] - Flag indicating whether to directly compare patents.
 * @returns {Promise<number|null>} A promise that resolves with the similarity percentage, or null if comparison fails.
 */
export const comparePatents = async (directComparison = false) => {
    try {
        // Make a GET request to the Flask route
        const requestBody = {directComparison}
        const response = await fetch('http://localhost:5000/calculate-similarities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            // Parse the response data
            const similarities = await response.json();
            const similarityPercentage = Math.round(similarities[1] * 100); // Access the second element of the tuple
            console.log("Similarity Percentage:", similarityPercentage);

            // Return the similarity percentage
            return similarityPercentage;
        } else {
            console.error('Failed to fetch similarities:', response.statusText);
            // If an error occurs, you might want to return a default value or handle the error differently
            return null;
        }
    } catch (error) {
        console.error('Error fetching similarities:', error);
        // If an error occurs, you might want to return a default value or handle the error differently
        return null;
    }
};

/**
 * Retrieve patents from the server.
 * @returns {Promise<Response|null>} A promise that resolves with the response containing patents, or null if retrieval fails.
 */
export const retrievePatents = async () => {
    try {
        const response = await fetch('http://localhost:5000/retrieve_patents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response && response.ok) {
            return response
        } else {
            console.error('Failed to retrieve patents');
            // If an error occurs, you might want to return a default value or handle the error differently
            return null;
        }
    } catch (error) {
        console.error('Error retrieving patents:', error);
        return null;
    }
};

/**
 * Start a chat session with the server.
 * @returns {Promise<void>} A promise that resolves when the chat session is started.
 */
export const startChat = async () => {
    try {
        console.log("Chat started");
        const response = await fetch('http://localhost:5000/start_chat');
        if (response && response.ok) {
            console.log("Chat started successfully");
        } else {
            console.error("Error starting chat");
        }
    } catch (error) {
        console.error("Error starting chat:", error);
    }
};

/**
 * Retrieve a single PDF file from the server.
 * @param {string} filename - The name of the PDF file to retrieve.
 * @returns {Promise<Response|null>} A promise that resolves with the response containing the PDF file, or null if retrieval fails.
 */
export const retrieveSinglePDF = async (filename) => {
    const requestBody = {filename}
    try {
        const response = await fetch('http://localhost:5000/retrieve_single_PDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response && response.ok) {
            console.log("Successfully retrieved single pdf")
            return response
        } else {
            console.error('Failed to retrieve pdf');
            // If an error occurs, you might want to return a default value or handle the error differently
            return null;
        }
    } catch (error) {
        console.error('Error retrieving pdf:', error);
        return null;
    }
}

/**
 * Upload patent files to the server.
 * @param {FileList} files - The list of patent files to upload.
 */
export const uploadPatentToServer = async (files) => {
    try {
        console.log("Files:", files);
        console.log("Files length:", files.length);
        console.log("Files type:", typeof files);

        if (files && files.length > 0) {
            const formData = new FormData();

            // Convert files to an array
            const filesArray = Array.from(files);

            filesArray.forEach((file, index) => {
                console.log(`File ${index}:`, file);
                formData.append(`file${index}`, file);
            });

            for (const key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }

            const response = await fetch('http://localhost:5000/add_patent', {
                method: 'POST',
                body: formData
            });

            if (response && response.ok) {
                console.log('File(s) uploaded successfully');
            } else {
                console.error('Failed to upload file(s)');
            }
        } else {
            console.error('No files provided');

        }
    } catch (error) {
        console.error('Error uploading file(s):', error);
    }
}

/**
 * Send a message to the server.
 * @param {string} message - The message to send.
 * @param {number|null} [percentage=null] - The percentage of similarity in the message context.
 * @returns {Promise<{text: string, contextPercentage: number}|null>} A promise that resolves with the received message and context percentage, or null if sending fails.
 */
export const sendMessage = async (message, percentage = null) => {
    if (message.trim() !== "") {
        try {
            console.log("Sending Message: ", message)
            const requestBody = { message };
            if (percentage !== null) {
                requestBody.percentage = percentage;
            }

            const response = await fetch('http://localhost:5000/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody) // Send the message and percentage in JSON format if percentage is provided
            });

            if (response && response.ok) {
                // Extract the response data as JSON
                const data = await response.json();
                const responseData = { text: data.text, context_percentage: data.context_percentage };
                console.log("Message Received:", responseData);
                // Ensure context_percentage is present in the response data
                // console.log("Response text: ", responseData.text)
                console.log("Context Percentage: ", responseData.context_percentage)
                // Return an object containing both the received message and context percentage
                return {
                    text: responseData.text,
                    contextPercentage: responseData.context_percentage
                };
            } else {
                console.log("Message not received.");
                return null; // Return null if message not received
            }
        } catch (error) {
            console.log("Error receiving message:", error);
            return null; // Return null if error occurs
        }
    }
};

