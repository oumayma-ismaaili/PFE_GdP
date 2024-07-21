import { useState } from "react";

const TruncatedText = ({ text, maxLength = 150 }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div>
      <span>{isTruncated ? truncatedText : text}</span>
      {text.length > maxLength && (
        <button
          onClick={toggleTruncate}
          className="ml-2 text-blue-600 text-sm font-semibold hover:text-blue-900"
        >
          {isTruncated ? "Read More" : "Read Less"}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
