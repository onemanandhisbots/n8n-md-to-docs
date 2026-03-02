# Markdown to Google Docs Converter for n8n

A Railway-ready Node.js service that converts Markdown content to Google Docs format, specifically designed for n8n workflows. It seamlessly integrates with n8n's Google OAuth credentials and is perfect for converting LLM outputs into properly formatted Google Docs.

## Overview

This project solves a common challenge in n8n workflows where you need to convert markdown output (especially from LLM nodes) into properly formatted Google Docs. While n8n's default Google Docs node doesn't support markdown formatting, this service provides a simple solution by accepting markdown content and creating a beautifully formatted Google Doc. The service is designed to work with n8n's Google OAuth credentials, making it a perfect drop-in solution for your n8n workflows.

### Key Benefits for n8n Users
- Works with your existing n8n Google OAuth credentials
- No additional authentication setup required
- Perfect for processing LLM node outputs
- Seamless integration with n8n HTTP Request node
- Maintains formatting that n8n's native Google Docs node doesn't support

The service handles various Markdown elements including:
- Headings (H1-H6)
- Paragraphs with proper spacing
- Lists with proper indentation
- Bold text formatting
- Multiple line breaks
- Consistent font styling and sizing

## Quick Start

### Hosted Service
The service is freely available at: `https://md2doc.n8n.aemalsayer.com/convert`

Send a POST request with:
```json
{
    "output": "# Your Markdown Content\n\nThis is a **bold** statement",
    "fileName": "My Generated Doc"
}
```

Required headers:
- `Content-Type: application/json`
- `Authorization: Bearer YOUR_N8N_GOOGLE_OAUTH_TOKEN` // Uses your n8n Google OAuth credentials

### Self-Hosting
You can also fork this repository and host it on your own infrastructure.

## Demo

Watch how the converter works in this demonstration:

[![Markdown to Google Docs Converter Demo](https://img.youtube.com/vi/r2HdgJiCInA/0.jpg)](https://youtu.be/r2HdgJiCInA)

## Features

- Deployable on Railway as a standard Node.js web service
- OAuth2 authentication for Google Docs API
- Clean and consistent document formatting
- Maintains document hierarchy and styling
- Handles complex Markdown structures
- Perfect for n8n workflows with LLM outputs

## Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```
3. Run locally:
```bash
bun run build
node lib/server.js
```
4. Deploy to Railway:
   - Create a new Railway project and connect this repository
   - Set build command to `bun run build`
   - Set start command to `bun run start`
   - Ensure `NODE_ENV=production` is configured

### Deploy without linking a GitHub repo (Railway CLI)

If GitHub connection approvals are blocked, the easiest path is Railway CLI deploy from your local machine:

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

Then set environment variables in Railway:

```bash
railway variables set NODE_ENV=production
```

You can also set variables from the Railway dashboard if CLI variable permissions are restricted.

When you push updates later, redeploy with:

```bash
railway up
```

This repo already contains `railway.json` with build/start commands, so `railway up` will use those defaults.

## Usage in n8n

### 1. Configure HTTP Request Node

Add an HTTP Request node and configure it as follows:

![HTTP Request Node Configuration](.github/assets/screen1.png)

1. Method: `POST`
2. URL: `https://md2doc.n8n.aemalsayer.com/convert`
3. Authentication: 
   - Predefined Credential Type
   - Credential Type: `Google Docs OAuth2 API`
   - Select your Google Docs account

### 2. Configure Request Body

![Request Body Configuration](.github/assets/screen2.png)

Set up the body parameters:

```json
{
  "output": "{{$json.output}}",
  "fileName": "Notes {{$now}}"
}
```

Key Configuration Points:
- Body Content Type: `JSON`
- Send Body: `Enabled`
- Specify Body: `Using Fields Below`
- Parameters:
  1. `output`: Your markdown content (usually from an LLM node)
  2. `fileName`: Name for the generated Google Doc (supports expressions)

The service will return a response with the Google Doc URL and ID.

## Author

This project is maintained by [Aemal Sayer](https://aemalsayer.com), a freelance AI engineer based in Berlin, Germany. With over 23 years of software development experience, including 8 years in ML/AI and 2 years specializing in AI Agents development, Aemal works with industry leaders like Klarna, Siemens, and Allianz to deliver transformative AI solutions.

### Get in Touch
- Website: [aemalsayer.com](https://aemalsayer.com)
- Location: Berlin, Germany
- WhatsApp: +49 176 610 94 196

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Troubleshooting

### `bun install` / `npm install` returns `403 Forbidden`

This is usually an environment networking or registry configuration issue (proxy, private registry, or missing token), not a project code issue.

1. Confirm the active registry:
```bash
npm config get registry
bun pm registry
```
Expected: `https://registry.npmjs.org/`

2. If a corporate proxy is set incorrectly, clear proxy settings and retry:
```bash
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy npm_config_http_proxy npm_config_https_proxy
npm config delete proxy
npm config delete https-proxy
bun install
```

3. If your org uses a private npm mirror, authenticate first:
```bash
npm login --registry <your-registry-url>
```
(or configure `NPM_TOKEN` in CI/Railway if required).

4. Re-run install and build:
```bash
bun install
bun run build
```

If the install still fails in CI, run the same two checks (`npm config get registry` and `env | grep -i proxy`) in the pipeline logs to verify registry/proxy settings.
