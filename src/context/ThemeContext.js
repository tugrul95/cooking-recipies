import { createContext, useReducer } from "react";
// Initialize context object
export const ThemeContext = createContext();

// Reducer function to manipulate state with dispatch actions
function themeReducer(state, action) {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, nightMode: action.payload };
    default:
      return state;
  }
}

//function to return privider to wrap children components
export function ThemeProvider({ children }) {
  const initialState = {
    color: "#58249c",
    nightMode: false,
  };

  // initiate reducer
  const [state, dispatch] = useReducer(themeReducer, initialState);

  //   dispatch function to manipulate state in reducer function
  const changeColor = (newCol) =>
    dispatch({ type: "CHANGE_COLOR", payload: newCol });
  const changeMode = (mode) => {
    console.log(state.nightMode);
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };
  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
