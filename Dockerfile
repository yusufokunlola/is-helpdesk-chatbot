# Step 1: Use an official Python runtime as a parent image
FROM python:3.9-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the current directory contents into the container at /app
COPY . /app

# Step 4: Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Expose the Flask app port (default Flask port is 5000)
EXPOSE 8080

# Step 6: Set the environment variable to indicate Flask is running in production
ENV FLASK_ENV=production

# Step 7: Run the Flask application
CMD ["python", "app.py"]