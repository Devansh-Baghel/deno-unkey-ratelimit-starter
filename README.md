# Deno Unkey Ratelimit Starter

This is a minimal starter template showcasing how to use [Unkey](https://unkey.com) with Deno version 2 for rate limiting in a web server built with the [oak](https://deno.land/x/oak) framework.

## Features

- **Rate Limiting**: Use Unkey's powerful rate-limiting features to throttle requests based on identifiers like IP address, user ID, or custom logic.
- **Deno v2 Compatibility**: Built for Deno version 2 with native support for TypeScript and modern JavaScript.
- **Oak Framework**: A middleware framework similar to Express, built specifically for Deno.
- **Environment Variables**: Securely manage sensitive data like API keys using Deno's environment variables.

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/Devansh-Baghel/deno-unkey-ratelimit-starter.git
cd deno-unkey-ratelimit-starter
```

### 2. Set up environment variables
Copy the .env.example file to .env file in the root directory and add your Unkey root key:
```bash
cp .env.example .env
```

### 3. Run your server
```bash
deno task start
```

## Usage
### Public Route
- GET /: A simple welcome message.
### Protected Route (Rate Limited)
- GET /secret: This route is protected by Unkey's rate-limiting feature. After hitting the rate limit (2 requests in 30 seconds), you'll receive a 429 Too Many Requests response.
