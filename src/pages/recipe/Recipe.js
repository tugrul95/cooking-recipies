import "./Recipe.css";
import { useParams, useNavigate } from "react-router-dom";

import useTheme from "../../components/hooks/useTheme";
import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { nightMode } = useTheme();

  const goBack = () => navigate(-1);
  const deleteRecipe = () => {
    projectFirestore
      .collection("recipes")
      .doc(id)
      .delete()
      .then(() => navigate("/"));
  };
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRecipe(doc.data());
        } else {
          setError("Recipe not found");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [id]);
  return (
    <div>
      {error && <p className='error'>{error}</p>}
      {isLoading && <p className='loading'>Loading...</p>}
      {recipe && (
        <div className={`recipe ${nightMode ? "dark-mode" : ""}`}>
          <button className='go-back' onClick={goBack}>
            Back
          </button>
          <div className='delete' onClick={deleteRecipe}>
            <i class='far fa-trash-alt'></i>
          </div>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>{recipe.cookingTime} to cook</p>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <h4>Method:</h4>
          <p className='method'>{recipe.method}</p>
        </div>
      )}
    </div>
  );
}
