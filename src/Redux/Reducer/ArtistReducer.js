import { createReducer } from "@reduxjs/toolkit";
import {
    GET_ARTIST_REQUEST,
    GET_ARTIST_SUCCESS,
    GET_ARTIST_FAIL,
    GET_ARTIST_ERROR,
    GET_SPECIFIC_ARTIST_REQUEST,
    GET_SPECIFIC_ARTIST_FAIL,
    GET_SPECIFIC_ARTIST_SUCCESS,
    GET_SPECIFIC_ARTIST_ERROR,
    ARTIST_CREATE_REQUEST,
    ARTIST_CREATE_FAIL,
    ARTIST_CREATE_SUCCESS,
    ARTIST_CREATE_ERROR,
    ARTIST_UPDATE_REQUEST,
    ARTIST_UPDATE_FAIL,
    ARTIST_UPDATE_ERROR,
    ARTIST_UPDATE_SUCCESS,
    ARTIST_DELETE_ERROR,
    ARTIST_DELETE_FAIL,
    ARTIST_DELETE_REQUEST,
    ARTIST_DELETE_SUCCESS,
} from "../Variables/ArtistVariable";

const initialState = {
    isLoading: false,
    allArtist: [],
    artisstSpecific: null,
};

export const ArtistReducer = createReducer(initialState, (builder) => {
    builder
        // parent category
        .addCase(GET_ARTIST_REQUEST, (state, action) => {
            state.isLoading = true;
        })
        .addCase(GET_ARTIST_FAIL, (state, action) => {
            state.isLoading = false;
        })
        .addCase(GET_ARTIST_SUCCESS, (state, action) => {
            state.isLoading = false;
            state.allArtist = action.payload;
        })
        .addCase(GET_ARTIST_ERROR, (state, action) => {
            state.isLoading = false;
            state.ERROR = action.payload;
        })
        // parent category specific
        .addCase(GET_SPECIFIC_ARTIST_REQUEST, (state, action) => {
            state.isLoading = true;
        })
        .addCase(GET_SPECIFIC_ARTIST_FAIL, (state, action) => {
            state.isLoading = false;
        })
        .addCase(GET_SPECIFIC_ARTIST_SUCCESS, (state, action) => {
            state.isLoading = false;
            state.artisstSpecific = action.payload;
        })
        .addCase(GET_SPECIFIC_ARTIST_ERROR, (state, action) => {
            state.isLoading = false;
            state.ERROR = action.payload;
        })
        // Create Parent Category
        .addCase(ARTIST_CREATE_REQUEST, (state) => {
            state.isLoading = true;
        })
        .addCase(ARTIST_CREATE_FAIL, (state) => {
            state.isLoading = false;
        })
        .addCase(ARTIST_CREATE_SUCCESS, (state) => {
            state.isLoading = false;
        })
        .addCase(ARTIST_CREATE_ERROR, (state, action) => {
            state.isLoading = false;
            state.ERROR = action.payload;
        })
        // Update Parent Category
        .addCase(ARTIST_UPDATE_REQUEST, (state) => {
            state.isLoading = true;
        })
        .addCase(ARTIST_UPDATE_FAIL, (state) => {
            state.isLoading = false;
        })
        .addCase(ARTIST_UPDATE_SUCCESS, (state) => {
            state.isLoading = false;
        })
        .addCase(ARTIST_UPDATE_ERROR, (state, action) => {
            state.isLoading = false;
            state.ERROR = action.payload;
        })
        // Delete Parent Category
        .addCase(ARTIST_DELETE_REQUEST, (state) => {
            state.isLoading = true;
        })
        .addCase(ARTIST_DELETE_FAIL, (state) => {
            state.isLoading = false;
        })
        .addCase(ARTIST_DELETE_SUCCESS, (state) => {
            state.isLoading = false;
        })
        .addCase(ARTIST_DELETE_ERROR, (state, action) => {
            state.isLoading = false;
            state.ERROR = action.payload;
        })
});
