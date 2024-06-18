import { cva } from '../styled-system/css'

//shuffel the board
export const shuffleArray = (arr: any[]): any[] => {
  return arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
};

//cva boutton
export const button = cva({
  base: {
    display: 'flex',
    fontFamily: 'BelweStd-Bold',
    fontSize: 'xx-large',
    margin: 'auto',
    bg: '#b27318e8', 
    color: '#301d00',
    padding: '2',
    borderRadius: '20%',
    boxShadow: '0 12px #999',
    '&:hover': {backgroundColor: "#7c5010e8"},
    '&:active': {
      backgroundColor: '#7c5010e8',
      boxShadow: '0 5px #666',
      transform: 'translateY(4px)',
    }
  },
});

//cva paragraphe
export const paragraphe = cva({
  base: {
    fontFamily: 'BelweStd-Bold',
    fontSize: 'x-large',
    marginTop: '2%',
    marginBottom: '1%',
  }
})