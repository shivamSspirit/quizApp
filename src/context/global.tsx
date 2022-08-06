import axios from 'axios'
import React, { useEffect, createContext, useContext, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAuths } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const QuizGlobalContext = createContext({})

type AppProps = {
    children?: React.ReactNode;
}
export interface QuestionObjInterface {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}
export interface CategoryObjinterface {
    id: number;
    name: string;
}
export interface ResultInterface {
    selectedfromUser: string;
    currentObj: QuestionObjInterface;
}


const QuizContextProvider = (props: AppProps) => {
    const [quizCategory, setQuizCategory] = useState<CategoryObjinterface[]>();
    const [results, setResults] = useState<any>([]);
    const [score, setScore] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [filteredCate, setFilteredCate] = useState<QuestionObjInterface[]>([]);
    const { auth } = useAuths()
    const [user, loading, error] = useAuthState(auth);


    const updateResult = async (currentResult: any) => {
        console.log('cresult from global', currentResult)
        setResults([...results, currentResult])
    }

    useEffect(() => {
        if (loading) {
            // add loader
            return;
        }
        if (user) {
            console.log('current user', user)
        }
    }, [user, loading]);


    useEffect(() => {
        (async () => {
            setLoader(true);
            const repsponse = await axios?.get('https://opentdb.com/api_category.php');
            setQuizCategory(repsponse?.data?.trivia_categories)
            setLoader(false);
        })()
    }, [])

    let contextValue = {
        quizCategory, setQuizCategory, score, setScore, loader, setLoader, filteredCate, setFilteredCate, setResults, updateResult, results,
        user, loading, error
    }

    return (
        <QuizGlobalContext.Provider value={contextValue}>
            {props.children}
        </QuizGlobalContext.Provider>
    )
}

export default QuizContextProvider
export const useQuizs = () => useContext(QuizGlobalContext)