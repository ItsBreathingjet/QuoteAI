import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, ClockIcon, Calendar, Star } from "lucide-react";
import { Quote } from "@shared/schema";

interface RecentQuotesProps {
  quotes: Quote[];
}

export default function RecentQuotes({ quotes }: RecentQuotesProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    
    // Format date part
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    // Format time part
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return `${formattedDate} at ${formattedTime}`;
  };
  
  return (
    <Card className="bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 pb-2 pt-3 px-4">
        <CardTitle className="flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <History className="text-primary h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Quote History</h3>
            <p className="text-[10px] font-normal text-slate-500 mt-0.5">Previously generated inspirational quotes</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {quotes.length > 0 ? (
          <div className="space-y-3">
            {quotes.map((quote, index) => (
              <div 
                key={index} 
                className="group rounded-md bg-gradient-to-r from-white to-slate-50 shadow-sm hover:shadow transition-all duration-300 overflow-hidden border border-slate-200"
              >
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-3 w-3 text-slate-400" />
                      <span className="text-[10px] font-medium text-slate-500">
                        {formatDateTime(String(quote.createdAt))}
                      </span>
                    </div>
                    <div className="bg-slate-100 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className="h-2 w-2 text-amber-400" />
                    </div>
                  </div>
                  
                  <p className="font-serif text-slate-700 text-sm leading-relaxed">"{quote.text}"</p>
                  
                  <div className="flex justify-end mt-2">
                    <span className="text-xs italic text-slate-600">— {quote.author}</span>
                  </div>
                </div>
                <div className="h-0.5 w-full bg-gradient-to-r from-primary/30 to-blue-400/30"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center">
            <div className="rounded-full bg-slate-100 h-10 w-10 flex items-center justify-center mx-auto mb-2">
              <Calendar className="h-4 w-4 text-slate-400" />
            </div>
            <h4 className="text-sm font-medium text-slate-700 mb-1">No Quote History</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your previously generated quotes will appear here. Generate your first quote to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
