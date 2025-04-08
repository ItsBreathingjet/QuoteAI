import { Brain, LightbulbIcon, Quote, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 bg-white shadow-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
            <Brain className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">QuoteIQ</h1>
            <p className="text-xs text-gray-500">Enterprise Quote Solutions</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-600">
          <div className="flex items-center space-x-1">
            <Quote className="text-primary h-4 w-4" />
            <span>Quotes</span>
          </div>
          <div className="flex items-center space-x-1">
            <LightbulbIcon className="text-primary h-4 w-4" />
            <span>Solutions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="text-primary h-4 w-4" />
            <span>Enterprise</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600 font-medium hidden md:block">Powered by</div>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-full">n8n + AI</div>
        </div>
      </div>
    </header>
  );
}
