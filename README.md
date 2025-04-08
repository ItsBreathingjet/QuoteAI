# QuoteIQ - Inspirational AI Quote Generator

A modern web application that connects to an n8n workspace for AI quote generation and displays the results beautifully.

## Deployment Instructions

This is a full-stack application with separate front-end and back-end components. To deploy properly:

### Option 1: Deploy Backend on Replit, Frontend on Netlify

1. **Deploy Backend on Replit**
   - Keep your backend running on Replit where it is now
   - Make sure your project is on the "Always On" plan to keep the API available 24/7
   - Note your Replit app URL (e.g., https://your-quote-app.replit.app)

2. **Update API URL in code**
   - Edit `client/src/lib/queryClient.ts`
   - Replace `https://your-quote-app-backend.replit.app` with your actual Replit app URL

3. **Deploy Frontend on Netlify**
   - Connect your GitHub repository to Netlify
   - Netlify will use the netlify.toml configuration to:
     - Run our build script: `bash netlify-build.sh`
     - Use the directory specified in netlify.toml: `dist/client`
   - Set build settings on Netlify to use the proper build command if needed

### Option 2: Deploy Everything on Replit (Recommended)

You can also deploy the full application directly on Replit using the "Deploy" feature:

1. Click the "Run" button to start your application
2. Click on the "Deploy" tab in the side panel
3. Follow the instructions to deploy your Repl

## How It Works

- The frontend makes API calls to the backend
- The backend connects to n8n to generate AI quotes
- Quotes are stored in memory and displayed on the frontend
- The application prevents duplicate quotes from being generated

## Technologies Used

- Frontend: React, TanStack Query, Tailwind CSS, shadcn/ui
- Backend: Express, Node.js
- External API: n8n Webhook URL