const initialState = {
  increment: 0,
}; // object state untuk menyimpan redux

const dataCount = (state = initialState, action) => {
  switch (action.type) {
    case "@APP/COUNT": // id(type) dari reducer yang kita gunakan
      return {
        ...state, // dipakai untuk meraplace key yang sama dengan value berbeda
        increment: action.payload, // mengubah value increment
      };
    case "@APP/RESET_COUNT":
      return {
        ...state, 
        increment: 0,
      };
  }
  return state;
};

export default dataCount;