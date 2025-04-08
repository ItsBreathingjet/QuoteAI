import { Layers, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-6 py-4 bg-slate-900 text-white border-t border-slate-800 text-xs">
      <div className="max-w-4xl mx-auto px-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <div className="h-5 w-5 rounded bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                <Layers className="text-white h-3 w-3" />
              </div>
              <h3 className="text-sm font-bold">QuoteIQ</h3>
            </div>
            <p className="text-slate-400 text-[10px]">
              Inspirational AI quote generation to motivate and enlighten your day.
            </p>
          </div>
          
          <div className="hidden md:block">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 mb-2">Categories</h4>
            <ul className="space-y-1 text-slate-400 text-[10px]">
              <li className="flex items-center">
                <ChevronRight className="h-2 w-2 mr-1" />
                <span>Motivational Quotes</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-2 w-2 mr-1" />
                <span>Daily Inspiration</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-2 w-2 mr-1" />
                <span>Personal Growth</span>
              </li>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 mb-2">Technology</h4>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-slate-800 rounded-full text-[10px]">n8n</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded-full text-[10px]">AI</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded-full text-[10px]">React</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded-full text-[10px]">Tailwind</span>
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-[10px]">
            © {new Date().getFullYear()} QuoteIQ Inspirational Quotes. All rights reserved.
          </p>
          <p className="text-slate-500 text-[10px] mt-1 md:mt-0">
            All quotes are AI-generated and may not reflect real people or organizations.
          </p>
        </div>
      </div>
    </footer>
  );
}
