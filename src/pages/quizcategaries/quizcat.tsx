
import Header from '../../components/header/header'
import QuizCateCompoent from '../../components/quizCate/quizCategory'
import Loader from '../../components/loader/loader'
import { useQuizs } from '../../context/global'
import { useLocation } from 'react-router-dom'
import './quizcate.css'
import { useEffect } from 'react'

function QuizCategoryes() {
  const { setResults, loader, setScore }: any = useQuizs()
  const location = useLocation()


  useEffect(() => {
    if (location.pathname === '/categories') {
      setResults([]);
      setScore(0)
    }
  }, [])

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
