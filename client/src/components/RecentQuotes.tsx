import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { Quote } from "@shared/schema";

interface RecentQuotesProps {
  quotes: Quote[];
}

export default function RecentQuotes({ quotes }: RecentQuotesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <History className="text-primary mr-2 h-5 w-5" />
          Recent Quotes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {quotes.length > 0 ? (
          <div className="space-y-4">
            {quotes.map((quote, index) => (
              <div key={index} className="p-4 border-l-4 border-primary/20 bg-gray-50 rounded-r">
                <p className="font-serif text-gray-700">"{quote.text}"</p>
                <p className="text-sm text-gray-500 mt-1">
                  Generated on {formatDate(quote.createdAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 italic">
            No recently generated quotes.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
