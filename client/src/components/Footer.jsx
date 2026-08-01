const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Code Converter
          </h2>
          <p className="text-sm">
            Convert code between multiple programming languages with AI.
          </p>
        </div>

        {/* Center */}
        <div className="text-sm">
          © {year} AI Code Converter. All Rights Reserved.
        </div>

        {/* Right */}
        <div className="flex gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;