import { users, type User, type InsertUser, quotes, type Quote, type InsertQuote } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCurrentQuote(): Promise<Quote | null>;
  getRecentQuotes(limit?: number): Promise<Quote[]>;
  generateQuote(): Promise<Quote>;
  saveQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quotes: Map<number, Quote>;
  private currentQuoteId: number | null;
  private userCurrentId: number;
  private quoteCurrentId: number;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.currentQuoteId = null;
    this.userCurrentId = 1;
    this.quoteCurrentId = 1;
    
    // Initialize with some sample quotes
    this.initializeQuotes();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getCurrentQuote(): Promise<Quote | null> {
    if (this.currentQuoteId === null) return null;
    return this.quotes.get(this.currentQuoteId) || null;
  }
  
  async getRecentQuotes(limit: number = 5): Promise<Quote[]> {
    const allQuotes = Array.from(this.quotes.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return allQuotes.slice(0, limit);
  }
  
  async saveQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.quoteCurrentId++;
    const now = new Date();
    const quote: Quote = { 
      ...insertQuote, 
      id, 
      createdAt: now.toISOString() 
    };
    
    this.quotes.set(id, quote);
    this.currentQuoteId = id;
    return quote;
  }
  
  async generateQuote(): Promise<Quote> {
    // In a real implementation, this would call the n8n API
    // For now, generate some simulated quotes
    const possibleQuotes = [
      { text: "The journey of a thousand miles begins with a single step.", author: "AI Wisdom" },
      { text: "Innovation is the ability to see change as an opportunity, not a threat.", author: "AI Creator" },
      { text: "The best way to predict the future is to create it.", author: "AI Visionary" },
      { text: "In the middle of difficulty lies opportunity.", author: "AI Philosopher" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "AI Motivator" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "AI Sage" },
      { text: "Knowledge speaks, but wisdom listens.", author: "AI Observer" },
      { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "AI Guide" }
    ];
    
    const randomQuote = possibleQuotes[Math.floor(Math.random() * possibleQuotes.length)];
    return this.saveQuote(randomQuote);
  }
  
  private initializeQuotes() {
    const initialQuotes = [
      { text: "Creativity is intelligence having fun.", author: "AI Generator", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "AI Dreamer", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() }
    ];
    
    initialQuotes.forEach(quote => {
      const id = this.quoteCurrentId++;
      this.quotes.set(id, { ...quote, id });
    });
  }
}

export const storage = new MemStorage();
