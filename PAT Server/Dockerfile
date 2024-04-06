# Use an official Python runtime as a parent image
FROM python:3.9

ENV PAULO_OPEN_AI_KEY='Your api key here'
ENV KEY='Your encryption key here'

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python files to the working directory
COPY . .

# Copy the Patents directory to the working directory
COPY Patents ./Patents

# Copy the uploads directory to the working directory
COPY uploads ./uploads

# Run download.py to perform any setup tasks
RUN python download.py

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "main.py"]
