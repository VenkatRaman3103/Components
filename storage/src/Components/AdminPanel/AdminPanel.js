import React, { useState } from 'react';
import "./AdminPanel.css";

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  // Helper to get the current question
  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      image: '',
      options: [],
      isSingleSelect: true,
      correctAnswers: []
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionId(newQuestion.id);
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const handleTextChange = (e) => {
    if (!currentQuestion) return;
    const updatedQuestion = {
      ...currentQuestion,
      text: e.target.value,
    };
    updateQuestion(updatedQuestion);
  };

  const handleImageUpload = (e) => {
    if (!currentQuestion) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedQuestion = { ...currentQuestion, image: reader.result };
        updateQuestion(updatedQuestion);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    if (!currentQuestion) return;
    const updatedQuestion = { ...currentQuestion, image: '' };
    updateQuestion(updatedQuestion);
  };

  const addOption = () => {
    if (!currentQuestion) return;
    const newOption = { id: Date.now(), text: '', correct: false };
    const updatedQuestion = {
      ...currentQuestion,
      options: [...currentQuestion.options, newOption],
    };
    updateQuestion(updatedQuestion);
  };

  const updateOptionText = (optionId, text) => {
    if (!currentQuestion) return;
    const updatedOptions = currentQuestion.options.map(option =>
      option.id === optionId ? { ...option, text } : option
    );
    const updatedQuestion = { ...currentQuestion, options: updatedOptions };
    updateQuestion(updatedQuestion);
  };

  const toggleOptionCorrect = (optionId) => {
    if (!currentQuestion) return;
    const updatedOptions = currentQuestion.options.map(option => {
      if (option.id === optionId) {
        if (currentQuestion.isSingleSelect) {
          return { ...option, correct: true };
        } else {
          return { ...option, correct: !option.correct };
        }
      } else {
        return currentQuestion.isSingleSelect ? { ...option, correct: false } : option;
      }
    });

    const updatedQuestion = { ...currentQuestion, options: updatedOptions };
    updateQuestion(updatedQuestion);
  };

  const deleteOption = (optionId) => {
    if (!currentQuestion) return;
    const updatedOptions = currentQuestion.options.filter(option => option.id !== optionId);
    const updatedQuestion = { ...currentQuestion, options: updatedOptions };
    updateQuestion(updatedQuestion);
  };

  const toggleSelectType = () => {
    if (!currentQuestion) return;
    const updatedQuestion = {
      ...currentQuestion,
      isSingleSelect: !currentQuestion.isSingleSelect,
      options: currentQuestion.options.map(option => ({ ...option, correct: false })), // Reset correct answers on toggle
    };
    updateQuestion(updatedQuestion);
  };

  const deleteQuestion = (id) => {
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
    if (currentQuestionId === id) setCurrentQuestionId(null);
  };

  const handleDragStart = (e, index, type) => {
    e.dataTransfer.setData("index", index);
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e, dropIndex, type) => {
    const dragIndex = e.dataTransfer.getData("index");
    const dragType = e.dataTransfer.getData("type");

    if (type === "QUESTION" && dragType === "QUESTION") {
      const reorderedQuestions = Array.from(questions);
      const [movedQuestion] = reorderedQuestions.splice(dragIndex, 1);
      reorderedQuestions.splice(dropIndex, 0, movedQuestion);
      setQuestions(reorderedQuestions);
    } else if (type === "OPTION" && dragType === "OPTION" && currentQuestion) {
      const reorderedOptions = Array.from(currentQuestion.options);
      const [movedOption] = reorderedOptions.splice(dragIndex, 1);
      reorderedOptions.splice(dropIndex, 0, movedOption);
      const updatedQuestion = { ...currentQuestion, options: reorderedOptions };
      updateQuestion(updatedQuestion);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="admin-panel-container">
      {/* Question List */}
      <div className="questions-list">
        <h3>Questions</h3>
        <button onClick={addQuestion} className="add-question-btn">
          Add Question
        </button>
        {questions.length === 0 ? (
          <p className="no-questions">No questions added yet. Click the button above to add one.</p>
        ) : (
          <div className="questions-list-ul">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`question-item ${currentQuestionId === q.id ? 'addBorder' : ''}`}
                onClick={() => setCurrentQuestionId(q.id)}
                draggable
                onDragStart={(e) => handleDragStart(e, index, "QUESTION")}
                onDrop={(e) => handleDrop(e, index, "QUESTION")}
                onDragOver={allowDrop}
              >
                <div className="drag-icon">☰</div>
                <div>{index + 1} .</div>
                <div
                  className="question-preview"
                  style={{
                    fontWeight: currentQuestionId === q.id ? 'bold' : 'normal',
                    cursor: 'pointer',
                  }}
                >
                  {q.text || `Untitled Question ${index + 1}`}
                </div>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="delete-question-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Question Editor */}
      {currentQuestion && (
        <div className="question-editor">
          <h3>Edit Question</h3>
          <textarea
            value={currentQuestion.text}
            onChange={handleTextChange}
            placeholder="Enter your question here..."
            className="question-textarea"
          />
          <div className="image-upload">
            <button className="upload-btn">
              <label>
                Upload Image
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </label>
            </button>
            {currentQuestion.image && (
              <div className="image-preview">
                <img src={currentQuestion.image} alt="Question" className="uploaded-image" />
                <button onClick={deleteImage} className="delete-image-btn">
                  Delete Image
                </button>
              </div>
            )}
          </div>

          <div className="select-type-toggle">
            <label>
              <input
                type="radio"
                checked={currentQuestion.isSingleSelect}
                onChange={toggleSelectType}
              />
              Single Select
            </label>
            <label>
              <input
                type="radio"
                checked={!currentQuestion.isSingleSelect}
                onChange={toggleSelectType}
              />
              Multi Select
            </label>
          </div>

          <div>
            <h4>Options</h4>
            <ul>
              {currentQuestion.options.map((option, index) => (
                <li
                  key={option.id}
                  className="option-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index, "OPTION")}
                  onDrop={(e) => handleDrop(e, index, "OPTION")}
                  onDragOver={allowDrop}
                >
                  <div className="drag-icon">☰</div>
                  <div>{String.fromCharCode(97 + index)} .</div>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => updateOptionText(option.id, e.target.value)}
                    placeholder="Option text"
                    className="option-input"
                  />
                  <label>
                    <input
                      type={currentQuestion.isSingleSelect ? "radio" : "checkbox"}
                      checked={option.correct}
                      onChange={() => toggleOptionCorrect(option.id)}
                      name={`question-${currentQuestion.id}-options`}
                    />
                    Correct
                  </label>
                  <button
                    onClick={() => deleteOption(option.id)}
                    className="delete-option-btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={addOption} className="add-option-btn">
              Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
