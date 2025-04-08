import { Layers, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 py-10 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                <Layers className="text-white h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold">QuoteIQ</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Enterprise-grade AI quote generation for professional business communications.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Solutions</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center">
                <ChevronRight className="h-3 w-3 mr-1" />
                <span>Enterprise Quotes</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-3 w-3 mr-1" />
                <span>Content Automation</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-3 w-3 mr-1" />
                <span>Team Integration</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Technology</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs">n8n</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs">AI</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs">React</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs">Tailwind</span>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} QuoteIQ Enterprise Solutions. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs mt-2 md:mt-0">
            All quotes are AI-generated and may not reflect real people or organizations.
          </p>
        </div>
      </div>
    </footer>
  );
}
