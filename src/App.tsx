import './App.css';
import QuizContextProvider from './context/global';
import ALLroutes from './routes/routes';

import { BrowserRouter as BrowserRouter } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <BrowserRouter>
      <QuizContextProvider>
        <ALLroutes />
      </QuizContextProvider>
    </BrowserRouter>
  );
}

export default App;
