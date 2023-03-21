export interface IProfile {
  firstName: string;
  gamesPlayed: number;
  guessHistory: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  longestStreak: number;
  streak: number;
  wins: number;
}

export const InitBaseProfile: IProfile = {
  firstName: '',
  gamesPlayed: 0,
  guessHistory: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  longestStreak: 0,
  streak: 0,
  wins: 0,
};
