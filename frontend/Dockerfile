# Stage 1: Build the React application using Node
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code and build for production
COPY . .
RUN npm run build

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the built assets from the previous stage to Nginx's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
