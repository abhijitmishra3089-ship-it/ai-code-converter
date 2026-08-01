import { convertCode } from "../services/api";
import { copyToClipboard } from "../utils/helpers";
import { downloadCode } from "../utils/helpers";
import { clearEditor } from "../utils/helpers";
const Toolbar = ({
  inputCode,
  sourceLanguage,
  targetLanguage,
  setOutputCode,
  loading,
  setLoading,
}) => {
  const handleConvert = async () => {
    if (!inputCode.trim()) {
      alert("Please enter some code.");
      return;
    }

    try {
      setLoading(true);

      const result = await convertCode({
        sourceLanguage,
        targetLanguage,
        code: inputCode,
      });

      setOutputCode(result);
    } catch (error) {
      console.error(error);
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(setOutputCode);
      alert("Code copied!");
    } catch (err) {
      alert("Copy failed.",err);
    }
  };
   const handleDownload=()=>{
    if(!setOutputCode){
      alert("No converted code to download")
      return
    }
    downloadCode(setOutputCode,targetLanguage,"converted-language")
   }
  const handleClear = () => {
    clearEditor(inputCode,setOutputCode);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6 justify-center">
      <button
        onClick={handleConvert}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:bg-gray-500"
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      <button
        onClick={handleCopy}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        Copy
      </button>
       <button 
       onClick={handleDownload}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg ">
        Download
       </button>
      <button
        onClick={handleClear}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
      >
        Clear
      </button>
    </div>
  );
};

export default Toolbar;