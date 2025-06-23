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
        <div key={index} className="mb-8">
          <h3 className="mb-4 font-semibold text-lg">
            {decodeHTML(question.question)}
          </h3>
          <div className="flex flex-wrap gap-3">
            {question.allAnswers.map((answer, i) => {
              const isSelected = answers[index] === answer;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswerClick(index, answer)}
                  className={`
                    px-4 py-3 min-w-[140px] rounded-lg border-2 font-medium
                    transition-all duration-200 ease-in-out transform
                    hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer
                    ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
                        : "bg-white border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50"
                    }
                  `}
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
          className="mx-auto flex cursor-pointer mt-12 bg-gradient-to-r from-green-600 to-green-700 text-white
                     px-8 py-4 rounded-lg font-semibold text-lg
                     hover:from-green-700 hover:to-green-800
                     transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-xl active:scale-95"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default Quiz;
