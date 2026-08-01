// src/pages/Home.jsx

import { useState } from "react";
import Header from "../components/Header";
import LanguageSelector from "../components/LanguageSelector";
import CodeEditor from "../components/CodeEditor";
import Toolbar from "../components/Toolbar";
import OutputEditor from "../components/OutputEditor";
import Footer from "../components/Footer";

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [targetLanguage, setTargetLanguage] = useState("python");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">

        <LanguageSelector
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          setSourceLanguage={setSourceLanguage}
          setTargetLanguage={setTargetLanguage}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          <CodeEditor
            language={sourceLanguage}
            code={inputCode}
            setCode={setInputCode}
          />

          <OutputEditor
            language={targetLanguage}
            code={outputCode}
          />

        </div>

        <Toolbar
          inputCode={inputCode}
          outputCode={outputCode}
          setOutputCode={setOutputCode}
          loading={loading}
          setLoading={setLoading}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
        />

      </main>

      <Footer />
    </div>
  );
};

export default Home;