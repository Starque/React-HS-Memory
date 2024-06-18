//all card from the game
import card1 from "./assets/Carte/chamanCard.png";
import card2 from "./assets/Carte/warCard.png";
import card3 from "./assets/Carte/demoCard.png";
import card4 from "./assets/Carte/thiefCard.png";
import card5 from "./assets/Carte/paladinCard.png";
import card6 from "./assets/Carte/priestCard.png";
import card7 from "./assets/Carte/druidCard.png";
import card8 from "./assets/Carte/huntCard.png";
import card9 from "./assets/Carte/mageCard.png";
//backCard
import backCard from "./assets/Carte/backCard.png";
//utils
import { shuffleArray } from './utils';

export type CardType = {
    id: string;
    flipped: boolean;
    backImage: string;
    frontImage: string;
    matchingCardId: string;
};

const cards: string[] =  [card1, card2, card3, card4, card5, card6, card7, card8, card9];

//init of the board
export const createBoard = (): CardType[] => {
    const board = [...cards, ...cards].map((card,i) => ({
        id: `card${i}`,
        flipped: false,
        backImage: backCard,
        frontImage: card,
        clickable: true,
        matchingCardId: i < cards.length ? `card${i + cards.length}` : `card${i - cards.length}`
    }));
    return shuffleArray(board);
};