// npm install react-redux @reduxjs/toolkit
// npm install redux-persist


import {createSlice} from '@reduxjs/toolkit'


const bikesDataSlice = createSlice({
    name: 'bikesFromInfinitieQuery', // имя слайса, используется для генерации типов действий
    initialState: {
        bikesData: [],
        bikesInCart:[]
    },
    reducers: {
        addData: (state, action) => {
            state.bikesData.push(...action.payload);
        },
        addBikesInCart: (state, action) => {

            let bike = state.bikesInCart.find (bike => Number(bike.id)===Number(action.payload.id))
            if(!bike) {
                state.bikesInCart.push({
                    ...action.payload,
                    count: 1
                });
            }
            else {
                bike.count += 1;
            }
        },
        plusBikeInCart: (state, action) => {
            let bike = state.bikesInCart.find (bike => Number(bike.id)===Number(action.payload.id))
            if(bike) {
                bike.count += 1;
            }
            else {console.log("Байк не найден в массиве")}
        },
        minusBikeInCart: (state, action) => {
            console.log({ id: action.payload.id});
            let bike = state.bikesInCart.find (bike => Number(bike.id)===Number(action.payload.id))

            if(bike && bike.count === 1) {
                state.bikesInCart = state.bikesInCart.filter ((item)=> Number(item.id) !== Number(action.payload.id))
            }
            else if (bike) {
                bike.count -= 1;
            }
            else {console.log("Байк не найден в массиве")}

        },
        removeBikeInCart: (state, action) => {
            let bike = state.bikesInCart.find (bike => Number(bike.id)===Number(action.payload.id))
            if (bike) {
                state.bikesInCart = state.bikesInCart.filter ((item)=> Number(item.id) !== Number(action.payload.id))
            }
            else {console.log("Байк не найден в массиве")}

        }
    },
})

export const {addData,
    addBikesInCart,
    plusBikeInCart,
    minusBikeInCart,
    removeBikeInCart} = bikesDataSlice.actions;
export default bikesDataSlice.reducer;

