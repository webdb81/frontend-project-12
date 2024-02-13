import leoProfanity from 'leo-profanity';
import ruFilterAdvanced from './ruFilterAdvanced.js';

const ruDict = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDict);
leoProfanity.add(ruFilterAdvanced);

const filterWords = (word) => leoProfanity.clean(word);

export default filterWords;
