import JSZip from "jszip";

let chatMessages = []; // State to hold chat messages


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

// Function to handle form submission
export const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput.files || !fileInput.files[0]) {
        console.error('No file selected');
        return;
    }

    const file = fileInput.files[0];
    try {
        await uploadPatent(file);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

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

export const retrievePatents = async () => {
    try {
        const response = await fetch('http://localhost:5000/retrieve_patents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return response
        } else {
            console.error('Failed to retrieve patents:', response.statusText);
            // If an error occurs, you might want to return a default value or handle the error differently
            return null;
        }
    } catch (error) {
        console.error('Error retrieving patents:', error);
        return null;
    }
};


export const startChat = async () => {
    try {
        console.log("Chat started");
        const response = await fetch('http://localhost:5000/start_chat');
        if (response.ok) {
            console.log("Chat started successfully");
        } else {
            console.error("Error starting chat:", response.statusText);
        }
    } catch (error) {
        console.error("Error starting chat:", error);
    }
};

// export const compare_message = (firstMessage) => {
//     setMessages(prevMessages => [...prevMessages, { text: {firstMessage}, sender: 'bot', avatar: 'bot-avatar.png' }]);
// };

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

            if (response.ok) {
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

