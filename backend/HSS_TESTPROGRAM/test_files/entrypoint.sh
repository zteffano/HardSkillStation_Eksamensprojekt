#!/bin/bash
# entrypoint.sh

# Create the cron job with the specified interval
echo "*/$TEST_INTERVAL * * * * /tests/run_tests.sh 2>&1 | /usr/bin/tee -a /var/log/cron.log" | crontab -

# Start the cron service in the foreground
exec cron -f
