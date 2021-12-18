import "./ThemeSelector.css";
import useTheme from "./hooks/useTheme";

export default function ThemeSelector() {
  const { nightMode, changeMode, changeColor } = useTheme();
  return (
    <div className='theme-selector'>
      <div className='switch' onClick={() => changeMode(!nightMode)}>
        {nightMode ? (
          <i className='fas fa-sun'></i>
        ) : (
          <i className='fas fa-moon'></i>
        )}
      </div>
      <div className='colors'>
        <span className='purple' onClick={() => changeColor("#58249c")}></span>
        <span className='green' onClick={() => changeColor("seagreen")}></span>
        <span className='red' onClick={() => changeColor("#b41111")}></span>
      </div>
    </div>
  );
}
