import Header from "@/components/Header";
import QuoteDisplay from "@/components/QuoteDisplay";
import RecentQuotes from "@/components/RecentQuotes";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bolt } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Quote } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // N8N workspace URL - this would be an environment variable in a real app
  const n8nWorkspaceUrl = "https://your-n8n-workspace-url.com";
  
  // Query to fetch the current quote if it exists
  const { data: currentQuote, refetch } = useQuery<Quote | null>({
    queryKey: ['/api/quote/current'],
  });
  
  // Query to fetch recent quotes
  const { data: recentQuotes } = useQuery<Quote[]>({
    queryKey: ['/api/quotes/recent'],
    staleTime: 60000, // Refetch after 1 minute
  });
  
  // Mutation to generate a new quote
  const { mutate: generateQuote, isPending, isError } = useMutation({
    mutationFn: async () => {
      setIsGenerating(true);
      const response = await apiRequest('POST', '/api/quote/generate', {});
      return response.json();
    },
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Quote Generated",
        description: "Your AI quote has been successfully generated.",
      });
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error("Error generating quote:", error);
      toast({
        title: "Error",
        description: "Failed to generate quote. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  });
  
  const handleManualGenerate = () => {
    generateQuote();
  };
  
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex flex-col">
      <Header />
      
      <main className="max-w-4xl mx-auto py-8 px-4 md:py-12 flex-grow">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover AI-Generated Wisdom</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click the button below to generate an inspirational quote created by artificial intelligence.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative group">
            <a 
              href={n8nWorkspaceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 mb-4"
            >
              <Bolt className="mr-2 h-5 w-5" />
              Generate Quote
              <span className="absolute right-0 top-0 -mt-2 -mr-2 bg-white text-primary text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </a>
          </div>
          
          <p className="text-sm text-gray-500 italic">Opens in n8n workspace</p>
          
          <Button 
            variant="outline" 
            onClick={handleManualGenerate} 
            disabled={isPending} 
            className="mt-4"
          >
            {isPending ? "Generating..." : "Generate Quote Manually"}
          </Button>
        </div>

        <QuoteDisplay 
          quote={currentQuote} 
          isLoading={isPending || isGenerating}
          hasError={isError}
          onRetry={handleManualGenerate}
        />

        <div className="mt-12">
          <RecentQuotes quotes={recentQuotes || []} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
