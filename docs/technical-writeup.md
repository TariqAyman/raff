# Technical Writeup

## Key Design Decisions and Tradeoffs

1. **Node.js + Express**: Chosen for rapid development, large ecosystem, and straightforward async model.
2. **RabbitMQ**: Offers persistent messages and flexible routing for guaranteed delivery in our event-driven system.
3. **Redis**: Used as a distributed session cache to handle rate limiting, session invalidation, and caching.
4. **MongoDB**: Chosen for its flexibility and scalability, allowing for easy data modeling and querying.

## Scaling Considerations

- **Horizontal Scaling**: We use Docker containers and can add replicas behind a load balancer (e.g., AWS ALB, Kubernetes).
- **Stateful Services**: Payment service relies on DB transactions for critical data; the rest uses eventual consistency.
- **Load Testing**: Implemented load testing scripts to ensure the API can handle expected traffic.

## Security Measures

- **JWT** for authentication and role-based permissions.
- **HTTPS** for transport encryption.
- **Secret Management** (e.g., AWS Secrets Manager or environment variables in Docker).
- **Validation & Sanitization** of inputs to prevent injection attacks.

## Known Limitations

- **In-Memory Queues** (in the data engine example) do not persist messages. Production usage would require a robust queue system.
- **Minimal Payment Gateway Simulation**: Real logic would be more complex, handling card tokens, 3DS flows, etc.
- **Error Handling**: While basic error handling is implemented, more comprehensive strategies could be developed for production.

## Future Improvements

- **Improve Observability** with distributed tracing (OpenTelemetry) and real-time dashboards.
- **More Resilient CSV Processing** with a specialized data pipeline (Kafka + stream processing).
- **Microservices**: Further break monoliths into specialized services (e.g., user-auth, billing, reporting).
- **Enhanced Security**: Implement rate limiting and IP whitelisting for sensitive endpoints.

```mermaid
                      +----------+
+----------+  RabbitMQ|          |   +-------------------+
| Payment  |<-------->| Exchange |<->| Notification Svc  |
|  API     |          |          |   +-------------------+
+----------+          +----------+
       |                      ^
       |(webhooks)           | (aggregates, partial failures, etc.)
    v                      |
+----------+         +-----------+
| Data     |         | Data Store|
|  Engine  |-------->| (MongoDB) |
+----------+         +-----------+
       |
       | (CSV Processing)
       v
+----------+
| Redis    |
| Cache    |
+----------+
```
