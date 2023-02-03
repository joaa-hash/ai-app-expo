import { Profile } from '../types';

export const BaseProfile: Profile = {
  firstName: '',
  gamesPlayed: 0,
  guessHistory: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  streak: 0,
  longestStreak: 0,
};
