export default function Footer() {
  return (
    <footer className="mt-12 py-6 bg-gray-100 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm mb-2">
          AI Quote Generator — Powered by n8n and AI technology
        </p>
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} AI Quote Generator. All quotes are AI-generated and may not reflect real people.
        </p>
      </div>
    </footer>
  );
}
