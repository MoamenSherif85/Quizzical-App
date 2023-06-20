import HTMLReactParser from "html-react-parser";

function Question(props) {
  const answersElements = props.question.answers.map((ele) => {
    const styles = {
      backgroundColor:
        ele.state === "unmarked"
          ? "transparent"
          : ele.state === "wrong"
          ? "#F8BCBC"
          : "#94D7A2",
      border: ele.state === "unmarked" ? "1px solid #4D5B9E" : "none",
    };
    return (
      <button
        key={ele.id}
        className="answer"
        style={styles}
        onClick={() => props.handleAnswerClick(props.question.id, ele.id)}
        disabled={props.quizFinish ? true : false}
      >
        {HTMLReactParser(ele.answer)}
      </button>
    );
  });

  return (
    <div className="question">
      <div className="question__title">
        {HTMLReactParser(props.question.question)}
      </div>
      <div className="answers">{answersElements}</div>
    </div>
  );
}

export default Question;
