import "./Searchbar.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Search() {
  const [term, setTerm] = useState("");
  const navigator = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigator(`/search?q=${term}`);
    setTerm("");
  };
  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>Search:</label>
        <input
          type='text'
          id='search'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
