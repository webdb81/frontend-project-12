import leoProfanity from 'leo-profanity';

const ruDict = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDict);

const filterWords = (word) => leoProfanity.clean(word);

export default filterWords;
