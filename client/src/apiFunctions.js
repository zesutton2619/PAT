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

export const sendMessage = async (message) => {
    if (message.trim() !== "") {
        try {
            const response = await fetch('http://localhost:5000/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }) // Send the message in JSON format
            });

            if (response.ok) {
                console.log("Message Received:", response);
                // Extract the response data as text
                return await response.text(); // Return the received message
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

export const uploadPatent = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5000/upload_patent', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('File uploaded successfully');
            // Optionally, return any response data
            // const data = await response.json();
            // return data;
        } else {
            console.error('Failed to upload file');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

export const comparePatents = async () => {
    try {
        // Make a GET request to the Flask route
        const response = await fetch('http://localhost:5000/calculate-similarities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
            // Parse the response data
            const blob = await response.blob();
            const castedBlob = new Blob(blob);
            // Do something with the Blob, e.g., create a download link
            const downloadUrl = window.URL.createObjectURL(castedBlob);
            // Trigger a download or handle the Blob as needed
            window.open(downloadUrl);
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



export const startChat = async (event) => {
    console.log("Chat started")
}