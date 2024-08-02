export const state = {
  yesCount: 0,
  noCount: 0,
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
