import Header from "@/components/Header";
import QuoteDisplay from "@/components/QuoteDisplay";
import RecentQuotes from "@/components/RecentQuotes";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Quote } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  // Query to fetch the current quote if it exists
  const { data: currentQuote, refetch: refetchCurrentQuote } =
    useQuery<Quote | null>({
      queryKey: ["/api/quote/current"],
    });

  // Query to fetch recent quotes
  const { data: recentQuotes, refetch: refetchRecentQuotes } = useQuery<
    Quote[]
  >({
    queryKey: ["/api/quotes/recent"],
    staleTime: 60000, // Refetch after 1 minute
  });

  // Mutation to generate a new quote using our backend service
  const {
    mutate: generateQuote,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      setIsGenerating(true);
      
      // Use our backend endpoint that will call n8n for us
      const response = await apiRequest(
        "POST", 
        "/api/quote/generate",
        { action: "generate_quote" }
      );
      const data = await response.json();
      
      return data;
    },
    onSuccess: async () => {
      // Refetch quotes to update UI
      await refetchCurrentQuote();
      await refetchRecentQuotes();

      toast({
        title: "Quote Generated",
        description: "Your enterprise AI quote has been successfully generated.",
      });
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error("Error generating quote:", error);
      toast({
        title: "Connection Error",
        description: "Failed to generate quote. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    },
  });

  return (
    <div className="bg-gradient-to-b from-gray-50 to-slate-100 min-h-screen font-sans text-gray-800 flex flex-col">
      <Header />

      <main className="max-w-5xl mx-auto w-full py-8 px-4 md:py-16 flex-grow flex flex-col">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Enterprise AI Quote Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Leverage artificial intelligence to generate inspirational quotes
            for your business communications.
          </p>
        </div>

        {/* Quote Display - positioned ABOVE the button */}
        <div className="order-1 mb-12">
          <QuoteDisplay
            quote={currentQuote}
            isLoading={isPending || isGenerating}
            hasError={isError}
            onRetry={() => generateQuote()}
          />
        </div>

        {/* Action Button - positioned BELOW the quote */}
        <div className="order-2 flex flex-col items-center justify-center mb-12">
          <Button
            onClick={() => generateQuote()}
            disabled={isPending || isGenerating}
            size="lg"
            className="px-10 py-6 text-lg h-auto transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {isPending || isGenerating
              ? "Generating..."
              : "Generate Enterprise Quote"}
          </Button>
          <p className="mt-3 text-sm text-gray-500">
            Powered by advanced AI language models via n8n
          </p>
        </div>

        <div className="order-3 mt-8">
          <RecentQuotes quotes={recentQuotes || []} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
