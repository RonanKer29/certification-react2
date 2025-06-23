import { useState, useEffect } from "react";

const CategorySelect = ({ selectedCategory, onChange, quizStarted }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-4 w-1/3">
      <select
        id="categorySelect"
        disabled={quizStarted || isLoading}
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-3 py-2 w-full ${
          quizStarted ? "cursor-not-allowed" : ""
        }`}
      >
        <option value="" disabled>
          Select a Category
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
