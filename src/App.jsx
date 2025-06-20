import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const startQuiz = async (categoryId, difficulty) => {
    try {
      setIsLoading(true);
      setQuizStarted(true);
      let url = `https://opentdb.com/api.php?amount=5&type=multiple`;
      if (categoryId) url += `&category=${categoryId}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      const res = await fetch(url);
      const data = await res.json();
      const preparedQuestions = data.results.map((q) => {
        const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        );
        return { ...q, allAnswers };
      });
      setQuestions(preparedQuestions);
      setSelectedCategory(categoryId || "");
      setSelectedDifficulty(difficulty || "");
      setScore(0);
      setUserAnswers([]);
      navigate("/");
    } catch (err) {
      alert("Unable to load the quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitQuiz = (answers) => {
    let total = 0;
    answers.forEach((ans, i) => {
      if (ans === questions[i].correct_answer) total++;
    });
    setScore(total);
    setUserAnswers(answers);
    navigate("/results"); // Navigation vers la page Results
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuestions([]);
    setUserAnswers([]);
    setScore(0);
    navigate("/");
  };

  return (
    <>
      {/* Welcome toujours affiché sur toutes les pages */}
      <div className="p-6 max-w-2xl mx-auto">
        <Welcome
          onStart={startQuiz}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          quizStarted={quizStarted}
        />
      </div>

      {/* Routes pour Quiz et Results */}
      <Routes>
        <Route
          path="/"
          element={
            quizStarted && questions.length > 0 ? (
              <div className="p-6 max-w-7xl mx-auto">
                <Quiz
                  score={score}
                  questionsData={questions}
                  onSubmit={handleSubmitQuiz}
                  onRestart={handleRestart}
                />
              </div>
            ) : null
          }
        />
        <Route
          path="/results"
          element={
            <div className="p-6 max-w-7xl mx-auto">
              <Results
                score={score}
                questionsData={questions}
                userAnswers={userAnswers}
                onRestart={handleRestart}
              />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
