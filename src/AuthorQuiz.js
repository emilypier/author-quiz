import React from 'react';
//import logo from './logo.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'; 
import './App.css';
import './bootstrap.min.css';
import PropTypes from "prop-types";


function Hero(){
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1 className="animate"> Author Quiz</h1>
        <p>Select the book written by the author shown</p>  
      </div>
  </div> 
  )
}

function Book({title, onClick}){
  return(
    <div className="answer" onClick={()=>{onClick(title);}}>
      <p>{title}</p>
    </div>
  )
}

function Turn({author, books, highlight, onAnswerSelected}){

  function highlightToBgColor(highlight){
    const mapping={
      'none':'',
      'correct':'#28a745',
      'wrong':'#dc3545'
    }
    return mapping[highlight];
  }

return(<div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
<div className="col-4 offset-1">
  <img src={author.imageUrl} className="authorimage" alt="Author"/>
</div>
<div className="col-6" >
{books.map((title)=> <Book title={title} key={title} onClick={onAnswerSelected} />)}
</div>
</div>);
}

Turn.prototype={
  author: PropTypes.shape({
    name:PropTypes.string.isRequired,
    imageUrl:PropTypes.string.isRequired,
    imageSource:PropTypes.string.isRequired,
    books:PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books:PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected:PropTypes.func.isRequired,
  highlight:PropTypes.string.isRequired
};



function Continue({show, onContinue }){
return(
  <div className='row continue'>
    {show
    ? <div className="col-11">
      <buton className='btn btn-primary btn-lg float-right'onClick={onContinue}>Continue</buton>
    </div>
    :null }
    
  </div>
);
}

function Footer(){
  return(
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikipedia Commons</a> and are in the public domain.
        </p>
      </div>
    </div>
  );
}

function mapStateToProps(state){
  return{
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch){
  return {
    onAnswerSelected:(answer)=>{
      dispatch({type:'ANSWER_SELECTED',answer});
    },
    onContinue:()=>{
      dispatch({type:'CONTINUE'});
    }     
  };
}

const AuthorQuiz = connect (mapStateToProps, mapDispatchToProps)(
  function ({turnData, highlight,onAnswerSelected,onContinue}) {
  return (
    <div className="container-fluid">
      <Hero/>
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight==='correct'} onContinue={onContinue}/>
      <p><Link to='/add'>Add an Author</Link></p>
      <Footer/>
    </div>
  );
});

export default AuthorQuiz;
