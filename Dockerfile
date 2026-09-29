# Optimized Dockerfile for UX/UI Case Study Viewer Web Application
FROM nginx:1.25-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend static files into Nginx document root
COPY frontend/ /usr/share/nginx/html/

# Expose port 80 for HTTP traffic
EXPOSE 80

# Healthcheck to ensure container is healthy
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
