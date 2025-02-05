import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./RichTextEditor.css"; 

const RichTextEditor: React.FC = () => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText("Start typing here...")));

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        const contentState = convertFromRaw(parsedContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error loading editor content:", error);
        setEditorState(EditorState.createEmpty());
      }
    }
  }, []);

  useEffect(() => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
  }, [editorState]);

  const handleBold = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  const handleItalic = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  const handleUnderline = () => setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  const handleOrderedList = () => setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  const handleUnorderedList = () => setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"));

  return (
    <Box className="editor-container">
      <div className="editor-wrapper">
        <div className="editor-title">Rich Text Editor</div>

    
        <div className="button-container">
          <Button onClick={handleBold}>Bold</Button>
          <Button onClick={handleItalic}>Italic</Button>
          <Button onClick={handleUnderline}>Underline</Button>
          <Button onClick={handleOrderedList}>Ordered List</Button>
          <Button onClick={handleUnorderedList}>Unordered List</Button>
        </div>

       
        <div className="editor-area">
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>

     
        <div className="inline-buttons">
          <Button
            className="back-button"
            variant="contained"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default RichTextEditor;
