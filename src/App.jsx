import { useState } from "react";
import Welcome from "./components/Welcome";

const App = () => {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  if (currentStep === "welcome") {
    return <Welcome onStartQuiz={() => setCurrentStep("quiz")} />;
  }

  if (currentStep === "quiz") {
    return <Quiz questions={questions} onSubmitQuiz={navigateToResults} />;
  }
};

export default App;
