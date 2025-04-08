import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
      // In a real implementation, this would make an actual API call to the n8n workspace
      // For now, it just creates a new quote in our storage
      const newQuote = await storage.generateQuote();
      res.json(newQuote);
    } catch (error) {
      console.error('Error generating quote:', error);
      res.status(500).json({ message: 'Failed to generate quote' });
    }
  });

  // New endpoint to save quotes from the n8n webhook
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
