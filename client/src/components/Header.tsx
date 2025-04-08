import { Quote } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 bg-white shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Quote className="text-primary h-5 w-5" />
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">AI Quote Generator</h1>
        </div>
        <div className="text-sm text-gray-500">Powered by n8n & AI</div>
      </div>
    </header>
  );
}
