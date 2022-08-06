import React from 'react'

import { Routes, Route } from "react-router-dom";
import LoginPage from '../pages/auth/loginpage/loginpage';
import SignupPage from '../pages/auth/signuppage/signuppage';

import LandingPage from '../pages/landingPage/landingPage';
import QuizCategoryes from '../pages/quizcategaries/quizcat';
import Resultpage from '../pages/resultPage/resultPage';
import RulesPage from '../pages/rules/rules';
import SingleCateQuiz from '../pages/singlequizCate/singlequizCate';

export interface RouteProps {
    element?: React.ComponentType<any> | React.ComponentType<any>;
    children?: ((props:any) => React.ReactNode) | React.ReactNode;
    path?: string | string[];
    exact?: boolean;
  }


function ALLroutes() {
  return (
    <div>
      <Routes>
        <Route path='/auth/login' element={<LoginPage/>}/>
        <Route path='/auth/signup' element={<SignupPage/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/categories' element={<QuizCategoryes/>}/>
        <Route path='/categories/:categoryId' element={<SingleCateQuiz/>}/>
        <Route path="/rules" element={<RulesPage/>}/>
        <Route path='/result' element={<Resultpage/>}/>
      </Routes>
    </div>
  )
}

export default ALLroutes
