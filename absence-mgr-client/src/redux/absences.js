import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../configs/constants';
import axios from 'axios';

export const getAllAbsences = createAsyncThunk('absences/getAll',
    () => {
        // Note:: can use a separate component but this is used this way in order to reduce the number of API calls to get the memberName
        const membersMap = {};
        return axios.get(URL.MEMBERS).then((results) => {
            const members = results.data;
            members.forEach((member) => membersMap[member.userId] = member.name);
            return axios.get(URL.ABSENCES);
        }).then((results) => {
            const absences = results.data;
            absences.forEach((absence) => absence['userName'] = membersMap[absence.userId]);
            return { absences };
        }).catch((err) => console.error(err));
    });

export const absencesSlice = createSlice({
    name: "absences",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getAllAbsences.fulfilled]: (state, action) => {
            return action.payload.absences;
        }
    }
});


export default absencesSlice.reducer;