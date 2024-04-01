let chatMessages = []; // State to hold chat messages

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
            console.log("Similarities:", similarities);
            // Optionally, perform any further actions with the data
        } else {
            console.error('Failed to fetch similarities:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching similarities:', error);
    }
};

export const startChat = async (event) => {
    console.log("Chat started")
}