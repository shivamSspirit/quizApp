import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './singlecatequiz.css'
import { useParams } from 'react-router-dom'
import { useQuizs } from '../../context/global'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../loader/loader'

import { QuestionObjInterface as questionObj } from '../../context/global'

function SingleCateQuizComponent() {
    const { categoryId } = useParams();
    const [currentQuestions, setCurrentQuestions] = useState<questionObj[]>();
    const [questionsNumber, setQuestionNumber] = useState<number>(0);
    const [selected, setSelected] = useState<string>('');
    const { updateResult, score, setScore, loader, setLoader }: any = useQuizs();
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            if (categoryId) {
                setLoader(true);
                const response = await axios.get(`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=medium&type=multiple`)
                setCurrentQuestions(response?.data?.results)
                setLoader(false);
            }
        })()

    }, [categoryId])


    const handleSelectOptions = (currOption: string) => {
        if (currentQuestions) {
            if (currOption === selected && selected === currentQuestions[questionsNumber].correct_answer) {
                return 'class-primary'
            } else if (currOption === selected && selected !== currentQuestions[questionsNumber].correct_answer) {
                return 'class-sec'
            }
            if (currOption === currentQuestions[questionsNumber].correct_answer) return "class-primary";
        }
    }

    const handleNext = async () => {
        if (currentQuestions) {
            if (questionsNumber < 4) {
                await updateResult({ ...currentQuestions[questionsNumber], selected });
                setQuestionNumber((questionsNumber) => questionsNumber + 1);
                setSelected('');
            } else {
                navigate('/result')
            }
        }
    }

    return (
        <>
            {loader && <Loader />}
            <div className="question-container">
                {currentQuestions &&
                    <>
                        <div className="q-title">
                            <h2 className="que-title">
                                {`${currentQuestions ? currentQuestions?.[0]?.category : "Quizes"}`}
                            </h2>
                        </div>

                        <div className="q-socre">
                            <p className="socre-que0">
                                Question: {questionsNumber + 1}/{currentQuestions ? currentQuestions?.length : 5}
                            </p>
                            <p className="score-que1">
                                Score: {score}/25
                            </p>
                        </div>

                        <div className="q-des">
                            <p className="des">
                                {currentQuestions[questionsNumber]?.question}
                            </p>
                        </div>
                        <div className="options">

                            {[currentQuestions[questionsNumber]?.correct_answer, ...currentQuestions[questionsNumber]?.incorrect_answers]?.map((item: string, idx: number) => (
                                <p
                                    key={`option${idx}`}
                                    className={`option ${selected && handleSelectOptions(item)}`}
                                    onClick={async () => {
                                        setSelected(item);
                                        if (item === currentQuestions[questionsNumber]?.correct_answer) {
                                            await setScore((score: number) => score + 5);
                                        } else if (item !== currentQuestions[questionsNumber]?.correct_answer) {
                                            await setScore((score: number) => score - 1);
                                        }
                                    }}
                                >
                                    {item}
                                </p>

                            ))}
                        </div>
                        <div className="q-btn">
                            <Link to={'/categories'} className="btn outline-secondary ques-btn0">Back</Link>
                            <button onClick={handleNext} className="btn outline-secondary ques-btn1">{questionsNumber === 4 ? "End quiz" : "Next"}</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default SingleCateQuizComponent
