import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, AlertTriangle, Copy, Share, RotateCw } from "lucide-react";
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
        title: "AI Generated Quote",
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
      <div className="max-w-3xl mx-auto mb-8">
        <Card className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <CardContent className="flex flex-col items-center p-0">
            <Quote className="h-12 w-12 text-primary/20 mb-4" />
            <p className="text-lg md:text-xl font-serif text-gray-400 text-center">
              Your AI-generated quote will appear here after generation.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto mb-8">
        <Card className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <CardContent className="flex flex-col items-center justify-center animate-pulse p-0">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <RotateCw className="h-6 w-6 text-primary animate-spin" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <p className="mt-4 text-gray-500 text-sm">Generating wisdom...</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Error state
  if (hasError) {
    return (
      <div className="max-w-3xl mx-auto mb-8">
        <Card className="bg-white rounded-xl shadow-md p-8 border border-red-100">
          <CardContent className="flex flex-col items-center text-center p-0">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Unable to generate quote</h3>
            <p className="text-red-600 mb-4">There was an error connecting to the n8n workspace. Please try again later.</p>
            <Button onClick={onRetry} variant="destructive">
              <RotateCw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Quote display state
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <Card className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <CardContent className="p-0">
          <div className="relative">
            <Quote className="absolute -top-4 -left-2 h-8 w-8 text-primary/20" />
            <blockquote className="pl-8 pr-2 py-2">
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-800">
                {quote?.text}
              </p>
              <footer className="mt-4 text-right">
                <p className="text-gray-600 font-medium">— {quote?.author || "AI Generator"}</p>
              </footer>
            </blockquote>
            <Quote className="absolute -bottom-4 -right-2 h-8 w-8 text-primary/20 rotate-180" />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center mt-6 space-x-4">
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={shareQuote}>
          <Share className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>
    </div>
  );
}

// Need to import Check icon for the copied state
import { Check } from "lucide-react";
