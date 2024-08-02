export const state = {
  yesCount: 0,
  noCount: 0,
  votes: new Set<number>(),
};

export function incrementYes() {
  state.yesCount += 1;
}

export function incrementNo() {
  state.noCount += 1;
}

export function getState() {
  return state;
}

export const hasVoted = (userId: number) => {
  return state.votes.has(userId);
};

export const addVote = (userId: number) => {
  state.votes.add(userId);
};
