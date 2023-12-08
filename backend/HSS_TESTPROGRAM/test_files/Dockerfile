# Use an official Python runtime as a parent image
FROM python:3.8

# Install cron and any other necessary packages
RUN apt-get update && apt-get -y install cron

# Set the working directory to /tests
WORKDIR /tests

# Copy the test files and scripts into the container
COPY . .

# Install pytest, if not already covered by your requirements.txt
RUN pip install pytest

# Add /usr/local/bin to the PATH
ENV PATH="/usr/local/bin:${PATH}"

# Make sure the script is executable
RUN chmod +x run_tests.sh

# Environment variable to specify the interval for running tests, default to 10 minutes
ENV TEST_INTERVAL=10

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Set up the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the entrypoint script to setup cron job
ENTRYPOINT ["/entrypoint.sh"]

# Run the cron job in the foreground
CMD ["cron", "-f"]
