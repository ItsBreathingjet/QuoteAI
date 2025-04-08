import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, AlertTriangle, Copy, Share, RotateCw, Check, FileText, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Quote as QuoteType } from "@shared/schema";

interface QuoteDisplayProps {
  quote: QuoteType | null | undefined;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
}

export default function QuoteDisplay({ quote, isLoading, hasError, onRetry }: QuoteDisplayProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    if (!quote) return;
    
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Quote copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Failed to copy",
          description: "Could not copy text to clipboard",
          variant: "destructive",
        });
      });
  };
  
  const shareQuote = () => {
    if (!quote) return;
    
    if (navigator.share) {
      navigator.share({
        title: "Enterprise AI Generated Quote",
        text: `"${quote.text}" — ${quote.author}`,
        url: window.location.href,
      })
      .catch(err => {
        console.error("Failed to share: ", err);
        toast({
          title: "Failed to share",
          description: "Could not share quote",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Sharing not supported",
        description: "Web Share API not supported in your browser",
        variant: "destructive",
      });
    }
  };
  
  // Default state (no quote yet)
  if (!quote && !isLoading && !hasError) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-100 bg-gradient-to-br from-white to-slate-50">
          <CardContent className="flex flex-col items-center p-0">
            <div className="p-4 mb-6 rounded-full bg-slate-100 bg-opacity-80">
              <FileText className="h-10 w-10 text-primary/40" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Your Enterprise Quote</h3>
            <p className="text-lg md:text-xl font-serif text-slate-400 text-center max-w-2xl">
              Click the "Generate Enterprise Quote" button below to create a professional, AI-generated quote for your business needs.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-100 bg-gradient-to-br from-white to-slate-50">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <RotateCw className="h-8 w-8 text-primary animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Processing Request</h3>
            <div className="space-y-3 w-full max-w-md">
              <div className="h-4 bg-slate-200 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded-full w-5/6 animate-pulse"></div>
            </div>
            <p className="mt-6 text-slate-500 text-sm font-medium">Generating enterprise-grade content...</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Error state
  if (hasError) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-red-100 bg-gradient-to-br from-white to-red-50">
          <CardContent className="flex flex-col items-center text-center p-0">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Connection Error</h3>
            <p className="text-red-600 mb-6 max-w-md">We encountered an issue connecting to our AI service. Please verify your network connection and try again.</p>
            <Button onClick={onRetry} variant="destructive" size="lg" className="px-8">
              <RotateCw className="mr-2 h-4 w-4" /> Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Quote display state
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-100 bg-gradient-to-br from-white to-slate-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary/5 to-transparent w-48 h-48 -mr-16 -mt-16 rounded-full"></div>
        <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-blue-500/5 to-transparent w-48 h-48 -ml-16 -mb-16 rounded-full"></div>
        
        <CardContent className="p-0 relative z-10">
          <div className="flex items-start mb-6">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Enterprise Quote</h3>
              <p className="text-sm text-slate-500">Generated for your business needs</p>
            </div>
          </div>
          
          <div className="relative my-8">
            <Quote className="absolute -top-4 -left-2 h-10 w-10 text-primary/20" />
            <blockquote className="pl-12 pr-4 py-2">
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-800 tracking-wide">
                {quote?.text}
              </p>
              <footer className="mt-6 text-right flex justify-end items-center">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow mr-4"></div>
                <p className="text-slate-600 font-medium text-lg">— {quote?.author || "AI Generator"}</p>
              </footer>
            </blockquote>
            <Quote className="absolute -bottom-4 -right-2 h-10 w-10 text-primary/20 rotate-180" />
          </div>
          
          <div className="flex justify-end mt-8 space-x-4">
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="bg-white hover:bg-slate-50">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy Quote
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={shareQuote} className="bg-white hover:bg-slate-50">
              <Share className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
