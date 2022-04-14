import React, { useState } from "react";

const StatsItems = ({label, info}) => <p>{label}: {info}</p>

const Main = (props) =>  (
  <div>
    <button onClick={props.good}>Good</button>
    <button onClick={props.neutral}>Neutral</button>
    <button onClick={props.bad}>Bad</button>
  </div>
)

const Statistics = (props) => {
  if(!Boolean(props.arr.length)) {
    return <h3>No feedback given</h3>;
  }

  return (
  <div>
    <StatsItems label="Good" info={props.good}/>
    <StatsItems label="Neutral" info={props.neutral}/>
    <StatsItems label="Bad" info={props.bad}/>
    <StatsItems label="All" info={props.arr.length}/>
    <StatsItems label="Average" info={props.avrgHndlr}/>
    <StatsItems label="Positive" info={props.positiveHndlr}/>
  </div>
  );
};

const Anecdote = ({anecdotes}) => {
  const [slctd, setSlctd] = useState({
    selected: 0, votes: [1, 3, 4, 2]
  });

  const nextAnec = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSlctd((prevState, props) => {
      return ({
        ...prevState,
        selected: randomNumber
      });
    });
  };

  for(let i = 0; i < anecdotes.length; i++) {
    if(!slctd.votes[i]) slctd.votes[i] = 0
  }

  const vote = () => {
    const allVotes = [...slctd.votes]
    allVotes[slctd.selected] += 1
    setSlctd((prevState, props) => {
      return ({
        ...prevState,
        votes: allVotes
      });
    });
  };

  const highestVote = Math.max(...slctd.votes)
  const highestVotedAnecdote = anecdotes[slctd.votes.indexOf(highestVote)]

  if(highestVote === 0) return <p>No votes yet</p>

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* {anecdotes.map(anec => <p>{anec}</p>)} */}
      <p>
        Anecdote number {
          anecdotes.indexOf(anecdotes[slctd.selected]) + 1
        } with content <b>{anecdotes[slctd.selected]}</b> has {slctd.votes[slctd.selected]} votes
      </p>
      <button onClick={nextAnec}>next anecdotes</button>
      <button onClick={vote}>vote</button>
      <p>
        Anecdote number {
          anecdotes.indexOf(highestVotedAnecdote) + 1
        } with content <b>{highestVotedAnecdote}</b> has the highest vote count
      </p>
    </div>
  )
}

const App = () => {
  const [items, setItems] = useState({
    good: 0, neutral: 0, bad: 0, arr: [],
    anecdotes: [
      "If it hurts, do it more often",
      "Adding manpower to a late software project makes it later!",
      "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      "Premature optimization is the root of all evil.",
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients"
    ]
  });

  const goodHndlr = () => {
    setItems((prevState, props) => {
      return ({
        ...prevState,
        good: prevState.good + 1,
        arr: prevState.arr.concat("Good")
      });
    });
  };

  const neutralHndlr = () => {
    setItems((prevState, props) => {
      return ({
        ...prevState,
        neutral: prevState.neutral + 1,
        arr: prevState.arr.concat("Neutral")
      });
    });
  };

  const badHndlr = () => {
    setItems((prevState, props) => {
      return ({
        ...prevState,
        bad: prevState.bad + 1,
        arr: prevState.arr.concat("Bad")
      });
    });
  };

  const positiveHndlr = () => {
    let arrLen = items.arr.length, goodNum = 0, goodPercentage;

    for(let i = 0; i < arrLen; i++) {
      if (items.arr[i] === "Good") goodNum += 1;
    }
    goodPercentage = ((goodNum/arrLen) * 100) * 100
    return "≈" + Math.round(goodPercentage) / 100 + "%"
  };

  const avrgHndlr = () => `≈${Math.round(items.arr.length*100/3)/100}`

  return (
    <div>
      <h1>Give Feedback</h1>
      <Main good={goodHndlr} neutral={neutralHndlr} bad={badHndlr}/>  
      <Statistics
        arr={items.arr}
        good={items.good}
        neutral={items.neutral}
        bad={items.bad}
        avrgHndlr={avrgHndlr()}
        positiveHndlr={positiveHndlr()}
      />
      <Anecdote anecdotes={items.anecdotes}/>  
    </div>
  )
}

export default App;