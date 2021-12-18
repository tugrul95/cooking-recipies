import "./Home.css";
import RecipeList from "../../components/RecipeList";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes found");
        } else {
          let recipes = [];
          snapshot.docs.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
          });
          setIsLoading(false);
          setData(recipes);
        }
      },
      (err) => {
        setError(err.message);
      }
    );

    // Unsub from component in case it is not mounted and tries to update
    return () => unsub();
  }, []);

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isLoading && <p className='loading'>Loading...</p>}

      {data && <RecipeList recipes={data} />}
    </div>
  );
}
