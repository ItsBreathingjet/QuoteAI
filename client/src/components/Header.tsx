import { Brain, LightbulbIcon, Quote, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-3 px-3 bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
            <Brain className="text-white h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">QuoteIQ</h1>
            <p className="text-[10px] text-gray-500">Inspirational Quote Generator</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-5 text-xs font-medium text-gray-600">
          <div className="flex items-center space-x-1">
            <Quote className="text-primary h-3 w-3" />
            <span>Quotes</span>
          </div>
          <div className="flex items-center space-x-1">
            <LightbulbIcon className="text-primary h-3 w-3" />
            <span>Wisdom</span>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="text-primary h-3 w-3" />
            <span>Inspiration</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-xs text-gray-600 font-medium hidden md:block">Powered by</div>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-[10px] font-semibold py-1 px-2 rounded-full">n8n + AI</div>
        </div>
      </div>
    </header>
  );
}
