import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
    if (!categoryId || !difficulty) {
      alert(
        "Please select both a category and a difficulty before starting the quiz."
      );
      return;
    }

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
    navigate("/results");
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuestions([]);
    setUserAnswers([]);
    setScore(0);
    navigate("/");
  };

  const ProtectedResults = () => {
    if (userAnswers.length === 0 || questions.length === 0) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Results
          score={score}
          questionsData={questions}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      </div>
    );
  };

  const canStartQuiz = selectedCategory !== "" && selectedDifficulty !== "";

  return (
    <>
      <div className="">
        <Welcome
          onStart={startQuiz}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          quizStarted={quizStarted}
          canStartQuiz={canStartQuiz}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            quizStarted && questions.length > 0 ? (
              <div className="p-6 max-w-4xl mx-auto ">
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
        <Route path="/results" element={<ProtectedResults />} />
      </Routes>
    </>
  );
};

export default App;
