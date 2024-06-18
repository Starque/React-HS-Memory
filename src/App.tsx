import React from 'react';
import './App.css'
import { grid } from "../styled-system/patterns";
import { container } from "../styled-system/patterns";
import Card from './components/Card/Card';
import { button, paragraphe } from "./utils";
//setup
import { createBoard } from './setup';
//types
import { CardType } from './setup';
import { css  } from '../styled-system/css';
//logo
import logo from './assets/HearthStoneLogo.avif'
import victory from './assets/Victory.png'

function App() {
  const [cards, setCards] = React.useState(createBoard());
  const [matchedPairs, setMatchedPairs] = React.useState(0);
  const [clickedCard, setClickedCard] = React.useState<undefined | CardType>(undefined);
  const [numberOfClick, setnumberOfClick] = React.useState(0);
  const [bestScore, setbestScore] = React.useState(999);
  const [stylePopUp, setstylePopUp] = React.useState('popUpHide');

  //Click on card
  const handleCardClick = (currentClickedCard: CardType) => {
    setnumberOfClick(prev => prev + 1 )
    //Flipe the clicked card
    setCards(prev => prev.map(
      card => (card.id === currentClickedCard.id ? {...card, flipped: true} : card)
    ));

    if(!clickedCard) {
      setClickedCard(currentClickedCard);
      return;
    }

    const isMatched = clickedCard.matchingCardId === currentClickedCard.id;
    if(isMatched){
      setMatchedPairs(prev => prev + 1);
      //end of teh game
      if(matchedPairs+1 === cards.length / 2){
        setstylePopUp('popUpShow');
        if(bestScore === undefined){
          setbestScore(numberOfClick+1);
        }else if(bestScore > numberOfClick+1){
          setbestScore(numberOfClick+1);
        }
      }
    }else if(!isMatched){
      //if its not a match, wait one second and flip the cards back
      setTimeout(() => {
        setCards(prev => 
          prev.map(card => 
            card.id === clickedCard.id || card.id === currentClickedCard.id ? {...card, flipped: false } : card
          )
        );
      }, 1000);
    }

    setClickedCard(undefined);
  };

  //click on replay
  const replayClick = () => {
    setCards(createBoard());
    setMatchedPairs(0);
    setClickedCard(undefined);
    setnumberOfClick(0);
    setstylePopUp('popUpHide');
  };

  return (
    <div className={container({padding: 0, maxWidth: "90%"})}>
      <div>
        <img className={css({margin: 'auto', marginTop:'-5%'})} src={logo}></img>
        <h1 className={css({fontFamily:'BelweStd-Bold', fontSize:'xx-large', marginTop:'-6%', color:"#4b2f04", marginBottom:'2%'})}>The Memory Game</h1>
      </div>
      <div className={grid({columns: 6, gap: 3})}>
        {cards.map(card => (
          <Card key={card.id} card={card} callback={handleCardClick} />
        ))}
      </div>
      <div className={paragraphe()}>Number of Click : {numberOfClick}</div>
      <div>
        <button className={button()} onClick={replayClick}>Replay</button>
      </div>
      <div className={paragraphe()}>Best score : {bestScore === 999 ? "No record" : bestScore}</div>
      <div className={stylePopUp}>
        <img className={css({margin: 'auto'})} src={victory}></img>
      </div>
    </div> 
  )
}

export default App
