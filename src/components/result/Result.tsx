
import './result.css'
import ResultScoreSvg from '../../assets/img/svg/resultscore.svg'
import { Link } from 'react-router-dom'
import { useQuizs } from '../../context/global'

function Result() {
    const { score, results }: any = useQuizs();
    return (
        <div>
            <div className="result-content">
                <div className="res-svg">
                    <img className="res-img" src={ResultScoreSvg} alt="svg" />
                </div>

                <h2 className="res-title">
                    Result
                </h2>

                <div className="qna">
                    {results && results?.map((item: any, idx: number) => (
                        <div key={`res${idx}`} className="qna-box">
                            <h3 className="res-des">
                                {idx + 1}. {item?.question}
                            </h3>

                            {[item?.correct_answer, ...item?.incorrect_answers]?.map((que: string, idx: number) => (
                                <p key={`lis${idx}`} className={`res-option ${item?.selected===que && 'res-option0'}`}>{que}</p>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="score-board">
                    <p className="board-title">your score is</p>
                    <span className="score-digit">{score}/25</span>
                </div>

                <div className="board-btn">
                    <Link to='/categories' className="btn btn-primary-outline sc-btn">Back to category</Link>
                </div>

            </div>
        </div>
    )
}

export default Result
