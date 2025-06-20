import { useState } from "react";
import decodeHTML from "../utils/decodeHTML";

const Quiz = ({ questionsData, onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questionsData.length).fill(null)
  );

  const handleAnswerClick = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div>
      {questionsData.map((question, index) => (
        <div key={index} className="mb-6">
          <h3 className="mb-2 font-semibold">
            {decodeHTML(question.question)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {question.allAnswers.map((answer, i) => {
              const isSelected = answers[index] === answer;
              let buttonStyle =
                "border p-2 min-w-[120px] bg-gray-100 min-h-[40px] rounded transition-colors duration-150 cursor-pointer";

              buttonStyle += isSelected
                ? " bg-indigo-600 text-white font-semibold"
                : " bg-gray-100 hover:bg-indigo-600 hover:text-white";

              return (
                <button
                  key={i}
                  onClick={() => handleAnswerClick(index, answer)}
                  className={buttonStyle}
                >
                  {decodeHTML(answer)}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {allAnswered && (
        <button
          onClick={() => onSubmit(answers)}
          className="mt-10 bg-green-600 text-white px-4 py-2 rounded  font-semibold cursor-pointer hover:bg-green-700 transition-colors"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default Quiz;
