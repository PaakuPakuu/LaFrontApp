import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query";
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
    arrayUnion,
    collection,
    doc,
    updateDoc,
    getDocs,
} from 'firebase/firestore';
import firebase from "firebase/compat";
import firestore = firebase.firestore;

export const FirestoreApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Event'],
    endpoints(builder){
        fetchAllEvents: ({
            async queryFn() {
                try {
                   const ref = collection(firestore, 'event');
                   const querySnapshot = await getDocs(ref);

                   let events =
                }
            }
        })
})