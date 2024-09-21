import {create} from 'zustand'


export const useEmailStore = create((set) => ({
    email: "",
    setEmail: (value) => set(({email: value}))
  }))

export const usePasswordStore = create((set)=>({
    password: "",
    setPassword: (value) => set(({password: value}))
}))

export const useName = create((set)=>({
    name: "",
    setName: (value) => set(({name: value}))
}))

export const useError = create((set)=>({
    error: '',
    setError: (value) => set(({error: value}))
}))



  



