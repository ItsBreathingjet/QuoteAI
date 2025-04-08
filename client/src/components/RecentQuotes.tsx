import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, ClockIcon, Calendar, Star } from "lucide-react";
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
    <Card className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 pb-4">
        <CardTitle className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-lg mr-3">
            <History className="text-primary h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Quote History</h3>
            <p className="text-xs font-normal text-slate-500 mt-0.5">Previously generated enterprise quotes</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {quotes.length > 0 ? (
          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <div 
                key={index} 
                className="group rounded-lg bg-gradient-to-r from-white to-slate-50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-medium text-slate-500">
                        {formatDate(String(quote.createdAt))}
                      </span>
                    </div>
                    <div className="bg-slate-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className="h-3 w-3 text-amber-400" />
                    </div>
                  </div>
                  
                  <p className="font-serif text-slate-700 text-lg leading-relaxed">"{quote.text}"</p>
                  
                  <div className="flex justify-end mt-4">
                    <span className="text-sm italic text-slate-600">— {quote.author}</span>
                  </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-primary/30 to-blue-400/30"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="rounded-full bg-slate-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-medium text-slate-700 mb-1">No Quote History</h4>
            <p className="text-slate-500 max-w-sm mx-auto">
              Your previously generated quotes will appear here. Generate your first quote to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
