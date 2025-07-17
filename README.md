# Email Analyzer Webapp

This project migrates a Google Apps Script workflow to a Node.js web application.
It authenticates with Gmail, analyzes messages using various LLM providers, and
creates Salesforce contacts and tasks.

## Setup

1. Install dependencies (`npm install`)
2. Create a `.env` file with the required environment variables:
   - `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REDIRECT_URI`
   - `SALESFORCE_CLIENT_ID`, `SALESFORCE_CLIENT_SECRET`, `SALESFORCE_USERNAME`, `SALESFORCE_PASSWORD`, `SALESFORCE_DOMAIN`
   - `OPENAI_KEY` or other provider keys
   - `DATABASE_URL`
   - `SYSTEM_PROMPT`
3. Run the server with `npm start`

## Endpoints

- `GET /auth/google` – Start Gmail OAuth flow
- `POST /tasks/process` – Process emails based on a Gmail search query

This is an early skeleton and does not yet replicate all functionality from the
original Apps Script. It provides a foundation for modular services (Gmail,
Salesforce, LLM) and a REST API to trigger processing.
