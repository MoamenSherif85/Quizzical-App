import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import Loading from "./Loading";

function Quiz(){
  const [questions, setQuestions] = useState([]);
  const [quizFinish, setQuizFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    getQuestions();
  }, [])
  
  async function getQuestions(){
    setLoading(true);
    const res = await fetch('https://opentdb.com/api.php?amount=5')
    const data = await res.json();
    const questionsArr = data.results;
    setQuestions(questionsArr.map((ele) => {
      const answers = ele.incorrect_answers.map(answer => ({id: nanoid(), answer, state: 'unmarked'}));
      const correctIdx = Math.floor(Math.random() * (answers.length + 1));
      answers.splice(correctIdx, 0, {id: nanoid(), answer: ele.correct_answer, state: 'unmarked'})
      return {question:ele.question, id:nanoid(), correctIdx, answers, choice: undefined}
    }))
    setLoading(false);
  }
  
  const questionsElements = questions.map((ele) => {
    return <Question key={ele.id} handleAnswerClick={checkAnswer} question={ele} quizFinish={quizFinish} />
  })

  function checkAnswer(questionId, answerId){
    setQuestions(prev => prev.map((ele) => {
      if(ele.id === questionId){
        const answers = ele.answers.map((answer, idx) => {
          if(answer.id === answerId) {
            ele.choice = idx;
            return {...answer, state:'marked'};
          } else return {...answer, state:'unmarked'};
        })
        return {...ele, answers};
      } else {
        return ele;
      }
    }));
  }

  function getCorrectQuestions(){
    let cnt = 0;
    questions.forEach((ele) => {
      if(ele.choice === ele.correctIdx){
        cnt++;
      }
    })
    return cnt;
  }

  function checkAnswers(){
    if(quizFinish){
      getQuestions();
      setQuizFinish(false);
    } else {
      setQuizFinish(true);
      setQuestions(prevQuestions => prevQuestions.map((ele) => {
        const newAnswers = ele.answers.map((answer, idx) => {
          if(answer.state === 'marked' && idx !== ele.correctIdx){
            return {...answer, state:'wrong'};
          } else if(idx === ele.correctIdx){
            return {...answer, state:'marked'};
          }
          return answer;
        })
        return {...ele, answers: newAnswers}
      }))
    }
  }

  return (
    <div className="quiz">
      {
        loading ?
          <>
            <Loading />
          </>
        :
        <>
          <div className="questions">
            {questionsElements}
          </div>
          <div className="quiz__bottom">
            {quizFinish ? <p>You scored {getCorrectQuestions()}/5 correct answers</p> : ''}
            <button className="quiz__btn" onClick={checkAnswers}>
              {quizFinish ? 'Play again' : 'Check answers'}
            </button>
          </div>
        </>
      }
    </div>
  );
}

export default Quiz;