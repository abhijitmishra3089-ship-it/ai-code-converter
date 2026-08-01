// src/components/Header.jsx

const Header = () => {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo & Title */}
        <div>
          <h1 className="text-2xl font-bold">
            AI Code Converter
          </h1>
          <p className="text-sm text-gray-300">
            Convert code between multiple programming languages
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            History
          </button>

          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
            Dark Mode
          </button>
        </nav>

      </div>
    </header>
  );
};

export default Header;