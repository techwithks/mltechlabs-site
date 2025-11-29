FROM nginx:alpine

# Copy the static website files to the nginx html directory
COPY . /usr/share/nginx/html

# Configure Nginx to listen on the PORT environment variable
# Cloud Run sets this to 8080 by default
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
