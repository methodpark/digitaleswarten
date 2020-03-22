# Use small Alpine Linux image
FROM node:12-alpine

# Copy all local files into the image.
COPY . .

# Install npm dependencies
RUN npm ci --only-production --silent

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Serve the built application
CMD serve -l 5001 -s build

# Tell Docker about the port we'll run on.
EXPOSE 5001
