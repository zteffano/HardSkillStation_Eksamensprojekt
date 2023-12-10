#!/bin/bash
# This script runs pytest and outputs the result to stdout/stderr

# Print the PATH variable
echo "PATH is: $PATH"

# Check where pytest is located
which pytest

# Navigate to the script directory
cd "$(dirname "$0")"
echo "Starting pytest at $(date)" >&2

# Run pytest and redirect both stdout and stderr to the Docker logs
pytest . 2>&1

echo "Pytest finished at $(date)" >&2
