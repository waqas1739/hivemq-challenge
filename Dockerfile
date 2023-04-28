FROM docker/whalesay:latest
LABEL Name=hivemqchallenge Version=0.0.1
RUN apt-get -y update && apt-get install -y fortunes
CMD ["sh", "-c", "/usr/games/fortune -a | cowsay"]

# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port used by the application
EXPOSE 3000

# Set the environment variables for connecting to the HiveMQ broker
ENV MQTT_CLIENT_ID=<random_custom_id>
ENV MQTT_PROTOCOL=wss
ENV MQTT_HOSTNAME=<hostname>
ENV MQTT_PROTOCOL_VERSION=4
ENV MQTT_PORT=8884
ENV MQTT_PATH=/mqtt
ENV MQTT_CLEAN=true
ENV MQTT_RESUBSCRIBE=false
ENV MQTT_KEEPALIVE=60
ENV MQTT_RECONNECT_PERIOD=0
ENV MQTT_USERNAME=<username>
ENV MQTT_PASSWORD=<password>

# Start the application
CMD [ "npm", "start" ]

# Build the Docker image
docker build -t hivemqchallenge .

# Run the Docker container
docker run -p 3000:3000 hivemqchallenge
