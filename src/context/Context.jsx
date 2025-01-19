import React, { createContext } from "react";
import { run } from "../config/geminiApi";
import DOMPurify from "dompurify";

// Create the context
export const Context = createContext();

// Function to format the response by converting markdown-like syntax to HTML
const formatResponse = (response) => {
  let formattedResponse = response
    .replace(/##\s*(.*)/g, "<h2>$1</h2>")            // Convert `## Heading` to `<h2>Heading</h2>`
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")          // Convert `**text**` to `<b>text</b>`
    .replace(/\*(.*?)\*/g, "<i>$1</i>")              // Convert `*text*` to `<i>text</i>`
    .replace(/^(\d+)\.\s(.*?)(\n|$)/gm, "<ol><li>$2</li></ol>") // Convert numbered lists
    .replace(/^- (.*?)(\n|$)/gm, "<ul><li>$1</li></ul>") // Convert unordered lists with dashes
    .replace(/\n/g, "<br>");                         // Convert newlines to `<br>`

  return DOMPurify.sanitize(formattedResponse);      // Sanitize the HTML output using dompurify
};

// Context provider component
const ContextProvider = ({ children }) => {
  const onSent = async (prompt) => {
    try {
      const response = await run(prompt);
      const formattedResponse = formatResponse(response);
      return formattedResponse;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Error fetching response.";
    }
  };

  return (
    <Context.Provider value={{ onSent }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
