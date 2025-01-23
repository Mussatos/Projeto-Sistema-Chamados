import { useState, createContext, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../services/firebaseConnection";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { toast } from 'react-toastify'

import { data, useNavigate } from 'react-router-dom';


export const AuthContext = createContext({})


function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        async function checkLogin() {
            const storageUser = localStorage.getItem('@ticketsPRO');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        checkLogin();
    }, [])

    async function signIn(email, password) {
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const docRef = doc(db, 'users', uid);

                const docSnap = await getDoc(docRef);

                let data = {
                    uid: uid,
                    nome: docSnap.data().nome,
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false);
                toast.success("Bem-vindo(a) de volta!")
                navigate('/dashboard');
            })
            .catch((error) => {
                setLoadingAuth(false);
                toast.error("Ops, algo deu errado!")
            })
    }

    async function signUp(name, email, password) {
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                await setDoc(doc(db, 'users', uid), {
                    nome: name,
                    avatarUrl: null
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: name,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success("Seja bem-vindo ao sistema!")
                        navigate('/dashboard');
                    })
            })
            .catch((error) => {
                setLoadingAuth(false);
                toast.error("Ops, algo deu errado!")
            })

    }

    function storageUser(data) {
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
    }

    async function logout() {
        await signOut(auth);
        localStorage.removeItem('@ticketsPRO');
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user, // false -> converte a variável para booleana, ou seja, se o usuário estiver logado
                user,           // (existir informações dentro do useState 'user') a variável muda para 'true'
                signIn,
                signUp,
                logout,
                loadingAuth,
                loading,
                storageUser,
                setUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;