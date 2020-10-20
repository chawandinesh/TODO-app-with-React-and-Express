import React from "react";
import "./App.css";
import axios from "axios";
import NameForm from "./NameFrom";

function App() {
  const loadFile = async () => {
    await axios
      .get("http://localhost:8000")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadFile();
  }, []);


  return (
    <div className="App">
      <NameForm />
    </div>
  );
}

export default App;
