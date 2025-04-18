import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";

interface N8nResponse {
  text?: string;
  content?: string;
  quote?: string;
  author?: string;
  by?: string;
  [key: string]: any;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for quote generation and retrieval
  app.get('/api/quote/current', async (req, res) => {
    try {
      const currentQuote = await storage.getCurrentQuote();
      res.json(currentQuote);
    } catch (error) {
      console.error('Error fetching current quote:', error);
      res.status(500).json({ message: 'Failed to fetch current quote' });
    }
  });

  app.get('/api/quotes/recent', async (req, res) => {
    try {
      const recentQuotes = await storage.getRecentQuotes();
      res.json(recentQuotes);
    } catch (error) {
      console.error('Error fetching recent quotes:', error);
      res.status(500).json({ message: 'Failed to fetch recent quotes' });
    }
  });

  app.post('/api/quote/generate', async (req, res) => {
    try {
      // N8N webhook URL for quote generation
      const webhookUrl = "https://rmayerhofer.app.n8n.cloud/webhook/ITSC4010";
      
      // Get recent quotes to check for duplicates
      const recentQuotes = await storage.getRecentQuotes(10);
      let attempts = 0;
      let isUnique = false;
      let quoteText = "";
      let quoteAuthor = "";
      
      // Try up to 3 times to get a unique quote
      while (!isUnique && attempts < 3) {
        console.log(`Calling n8n webhook from server... (attempt ${attempts + 1})`);
        
        // Call the n8n webhook from the server side to avoid CORS issues
        const response = await fetch(webhookUrl, {
          method: "GET", // Changed to GET since that's what works in the browser
          headers: {
            "Accept": "application/json",
          }
        });

        if (!response.ok) {
          console.error(`N8n webhook error: HTTP ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the webhook response
        const responseData = await response.json();
        // Create a safe object with our expected interface
        const data = {
          text: typeof responseData === 'object' && responseData !== null ? (responseData as any).text : undefined,
          content: typeof responseData === 'object' && responseData !== null ? (responseData as any).content : undefined, 
          quote: typeof responseData === 'object' && responseData !== null ? (responseData as any).quote : undefined,
          author: typeof responseData === 'object' && responseData !== null ? (responseData as any).author : undefined,
          by: typeof responseData === 'object' && responseData !== null ? (responseData as any).by : undefined
        };
        console.log('Received response from n8n:', data);
        
        // Extract quote information from the webhook response
        quoteText = data?.text || data?.content || data?.quote || "Wisdom comes from experience and reflection.";
        quoteAuthor = data?.author || data?.by || "AI Wisdom";
        
        // Check if this quote text already exists in recent quotes
        const isDuplicate = recentQuotes.some(q => q.text === quoteText);
        
        if (!isDuplicate) {
          isUnique = true;
        } else {
          console.log('Duplicate quote detected, trying again...');
          attempts++;
          // Short delay before trying again
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      // If we couldn't get a unique quote after max attempts, just use the last one we got
      if (!isUnique) {
        console.log('Could not get unique quote after max attempts, using latest result');
      }
      
      // Save the quote in our storage
      const newQuote = await storage.saveQuote({ 
        text: quoteText, 
        author: quoteAuthor 
      });
      
      res.json(newQuote);
    } catch (error) {
      console.error('Error generating quote:', error);
      res.status(500).json({ message: 'Failed to generate quote', error: String(error) });
    }
  });

  // Endpoint to save quotes from the n8n webhook
  app.post('/api/quote/save', async (req, res) => {
    try {
      const { text, author } = req.body;
      
      if (!text || !author) {
        return res.status(400).json({ message: 'Text and author are required' });
      }
      
      const newQuote = await storage.saveQuote({ text, author });
      res.json(newQuote);
    } catch (error) {
      console.error('Error saving quote:', error);
      res.status(500).json({ message: 'Failed to save quote' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
