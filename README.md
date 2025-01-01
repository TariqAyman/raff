# Raff Tool

## Overview

Raff Tool is a technical assessment project built with Node.js and Express. It includes an API for payment processing, a data processing engine for handling CSV files, and an event-driven notification system. The project demonstrates various software engineering principles, including role-based access control, distributed caching, and microservices architecture.

## Features

- **Payment API**: Processes payments with role-based access control and error handling.
- **CSV Processing**: Concurrently processes multiple CSV streams with back-pressure handling.
- **Event-Driven Notifications**: Uses RabbitMQ for guaranteed delivery of notifications.
- **Distributed Caching**: Utilizes Redis for session management and rate limiting.
- **Load Testing**: Includes scripts for load testing the payment API.

## Technologies Used

- Node.js
- Express
- MongoDB
- Redis
- RabbitMQ
- Jest (for testing)
- Docker (for containerization)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/raff.git
   cd raff
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27020/mydb
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=mysecret
   RABBITMQ_URL=amqp://localhost
   ```

4. Start the services using Docker:

   ```bash
   docker-compose up
   ```

## Usage

### Running the Application

To start the application in development mode, run:

   ```bash
   npm run dev
   ```

### API Endpoints

- **POST /api/payments**: Process a payment.
- **POST /api/upload-csv**: Upload and process a CSV file.
- **POST /api/webhook**: Receive webhook notifications.

### Load Testing

To run load tests on the payment API, use the following command:

   ```bash
   k6 run load-tests/payment-api-loadtest.js
   ```

## Testing

To run the test suite, use:

   ```bash
   npm test
   ```

## Documentation

- [Technical Writeup](docs/technical-writeup.md)
- [System Architecture Diagram](docs/system-architecture-diagram.md)
- [Distributed Caching Documentation](docs/distributed-caching.md)
