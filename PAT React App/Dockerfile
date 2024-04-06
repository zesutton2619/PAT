# Use the official Node.js image as a base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY client/public ./public
COPY client/src ./src
COPY client/tailwind.config.js ./tailwind.config.js
COPY client/postcss.config.js ./postcss.config.js

# Build the React app
# Assuming you have a build script in package.json
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
