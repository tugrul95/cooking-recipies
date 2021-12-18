import "./Search.css";
import { useLocation } from "react-router";
import RecipeList from "../../components/RecipeList";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      projectFirestore
        .collection("recipes")
        .get()
        .then((snapshot) => {
          let allDocs = [];
          //get all docs and store in array above
          snapshot.docs.forEach((doc) => {
            allDocs.push({ id: doc.id, ...doc.data() });
          });
          // filter doc for query
          const result = allDocs.filter((doc) => {
            let t = doc.title.toLocaleLowerCase();
            let q = query.toLocaleLowerCase();
            if (t.includes(q)) {
              return doc;
            }
          });
          setRecipes(result);
          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [query, recipes]);
  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isLoading && <p className='loading'>Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
