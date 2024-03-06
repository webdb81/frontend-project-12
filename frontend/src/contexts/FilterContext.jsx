import React, { createContext, useContext, useMemo } from 'react';
import leoProfanity from 'leo-profanity';
import ruFilterAdvanced from '../profanity/ruFilterAdvanced.js';

const ruDict = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDict);
leoProfanity.add(ruFilterAdvanced);

const filterWords = (word) => leoProfanity.clean(word);

const FilterContext = createContext({
  filterWords,
});

export const useProfanity = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const value = useMemo(() => ({ filterWords }), []);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
