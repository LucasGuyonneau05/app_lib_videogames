import { create } from "zustand";
import { db } from "../firebase";
import { getDoc, doc, deleteDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import type { User } from "firebase/auth";

interface Game {
    id: string;
    title: string;
    publisher: string;
    img: string;
    genre: Array<String>;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    desc: String;
    [key: string]: any;
}

interface Review {
    id: string;
    user: string;
    game: string;
    message: string;
    score: number;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    [key: string]: any;
}

type GameState = {
    gameList: Array<Game>
    game: Game | null
    gameLikes: number
    isLiked: boolean
    reviewList: Array<Review>
    userReviews: Array<Review>

    fetchAllGames: () => void
    fetchGameById: (id: string) => void
    fetchLikesByGameId: (id: string) => void
    isLikedByUser: (id: string, user: User) => void
    likeGame: (id: string, user: User) => void
    unlikeGame: (id: string, user: User) => void
    resetIsLiked: () => void
    fetchReviewsByGameId: (idGame: string, user: User | null) => void
    fetchUserReview: (idGame: string, user: User) => void
    deleteReview: (idGame: string, user: User) => void
    createReview: (idGame: string, reviewMessage: string, reviewScore: number, user: User) => void
}

export const useGame = create<GameState>((set) => ({
    gameList: [],
    game: null,
    gameLikes: 0,
    isLiked: false,
    reviewList: [],
    userReviews: [],

    fetchAllGames: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "games"));
            if (!querySnapshot.empty) {
                const res = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    publisher: doc.data().publisher,
                    img: doc.data().img,
                    genre: doc.data().genre,
                    date: doc.data().date,
                    desc: doc.data().desc,
                    key: doc.id
                }));
                set({ gameList: res });
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    fetchGameById: async (id: string) => {
        try {
            const docRef = doc(db, "games", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const res = {
                    id: docSnap.id,
                    title: docSnap.data().title,
                    publisher: docSnap.data().publisher,
                    img: docSnap.data().img,
                    genre: docSnap.data().genre,
                    date: docSnap.data().date,
                    desc: docSnap.data().desc,
                    key: docSnap.id
                }
                set({ game: res })
            }
            else {
                console.log("Not found");
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    fetchLikesByGameId: async (id: string) => {
        let likeNb = 0;

        try {
            const docRef = collection(db, "likes");
            const docQuery = query(docRef, where("game", "==", id));
            const docSnap = await getDocs(docQuery);

            if (!docSnap.empty) {
                docSnap.forEach(() => {
                    likeNb += 1;
                })
            }
        }
        catch (error) {
            console.log(error);
        }
        set({ gameLikes: likeNb });
    },

    isLikedByUser: async (id: string, user: User) => {
        try {
            const docRef = collection(db, "likes");
            const docQuery = query(docRef, where("game", "==", id), where("user", "==", user.uid));
            const docSnap = await getDocs(docQuery);

            if (!docSnap.empty) {
                set({ isLiked: true });
            }
            else {
                set({ isLiked: false });
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    likeGame: async (id: string, user: User) => {
        try {
            await addDoc(collection(db, "likes"), {
                game: id,
                user: user.uid
            });
            set({ isLiked: true });
        }
        catch (error) {
            console.log(error);
        }
    },

    unlikeGame: async (id: string, user: User) => {
        try {
            const docRef = collection(db, "likes");
            const docQuery = query(docRef, where("game", "==", id), where("user", "==", user.uid));
            const docSnap = await getDocs(docQuery);

            docSnap.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            set({ isLiked: false });
        }
        catch (error) {
            console.log(error)
        }
    },

    resetIsLiked: async () => {
        set({ isLiked: false })
    },

    fetchReviewsByGameId: async (idGame: string, user: User | null) => {
        try {
            const docRef = collection(db, "reviews");
            const docQuery = query(docRef, where("game", "==", idGame));
            const docSnap = await getDocs(docQuery);
            let reviews = null;

            if (!docSnap.empty) {
                if (user != null) {
                    reviews = docSnap.docs
                        .filter((doc) => doc.data().user != user.uid)
                        .map((doc) => ({
                            id: doc.id,
                            user: doc.data().user,
                            game: doc.data().game,
                            message: doc.data().message,
                            score: doc.data().score,
                            date: doc.data().date,
                            key: doc.id
                        }));
                }
                else {
                    reviews = docSnap.docs
                        .map((doc) => ({
                            id: doc.id,
                            user: doc.data().user,
                            game: doc.data().game,
                            message: doc.data().message,
                            score: doc.data().score,
                            date: doc.data().date,
                            key: doc.id
                        }));
                }

                set({ reviewList: reviews });
            }
            else {
                set({ reviewList: [] });
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    fetchUserReview: async (idGame: string, user: User) => {
        try {
            const docRef = collection(db, "reviews");
            const docQuery = query(docRef, where("game", "==", idGame), where("user", "==", user.uid));
            const docSnap = await getDocs(docQuery);

            if (!docSnap.empty) {
                const reviews = docSnap.docs.map((doc) => ({
                    id: doc.id,
                    user: doc.data().user,
                    game: doc.data().game,
                    message: doc.data().message,
                    score: doc.data().score,
                    date: doc.data().date,
                    key: doc.id
                }));
                set({ userReviews: reviews });
            }
            else {
                set({ userReviews: [] })
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    deleteReview: async (idGame: string, user: User) => {
        try {
            const docRef = collection(db, "reviews");
            const docQuery = query(docRef, where("game", "==", idGame), where("user", "==", user.uid));
            const docSnap = await getDocs(docQuery);

            docSnap.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
        }
        catch (error) {
            console.log(error)
        }
    },

    createReview: async (idGame: string, reviewMessage: string, reviewScore: number, user: User) => {
        try {
            const date = new Date();
            const timestamp = Timestamp.fromDate(date);

            await addDoc(collection(db, "reviews"), {
                game: idGame,
                user: user.uid,
                score: reviewScore,
                message: reviewMessage,
                date: timestamp
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}))