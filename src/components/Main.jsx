function Main(props){

  function toggleStart(){
    props.setAppStart(true);
  }

  return (
    <main>
      <div className="main-header">
        <h1 className="main__title">Quizzical</h1>
        <p className="main__text">Answer some random questions and find out how knowledgeable you are.</p>
      </div>
      <button className="quiz__btn" onClick={toggleStart}>Start Quiz</button>
    </main>
  );
}

export default Main;