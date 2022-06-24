
import './quizCatecom.css'

import firstCateQuiz from '../../assets/img/jpeg/cash.jpg'

import { useQuizs } from '../../context/global'
import { Link } from 'react-router-dom'

import { CategoryObjinterface } from '../../context/global'


function QuizCateCompoent() {
    const { quizCategory, filteredCate }: any = useQuizs()
    return (
        <div>
            <div className="category-content">
                <h1 className="cat-title">Category</h1>
                <div className="category">

                    {(filteredCate ? filteredCate : quizCategory)?.map((item: CategoryObjinterface, idx: number | string) => (
                        <div key={`${idx}`} className="action-pad">
                            <div className="action-card rm-border">
                                <div className="img-container-product0 mini-contain">
                                    <img className="p-img0" alt="" src={firstCateQuiz} />
                                </div>
                                <div className="card-content-product0">
                                    <h3 className="title0 mini-title">{item?.name?.length > 24 ? `${item?.name?.slice(0, 24)}...` : item?.name}</h3>
                                    <Link className="btn-product0 mini-btn" to={`/categories/${item?.id}`}>
                                        See qizzes
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuizCateCompoent
