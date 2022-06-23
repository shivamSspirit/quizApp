import React from 'react'
import Header from '../../components/header/header'
import QuizCateCompoent from '../../components/quizCate/quizCategory'
import Loader from '../../components/loader/loader'
import { useQuizs } from '../../context/global'
import './quizcate.css'

function QuizCategoryes() {
  const { loader }: any = useQuizs()
  return (
    <div className='category-container'>
      {loader ? <Loader /> :
        <>
          <Header />
          <QuizCateCompoent />
        </>
      }
    </div>
  )
}

export default QuizCategoryes
