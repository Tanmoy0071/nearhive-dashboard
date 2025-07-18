export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export type User = {
    id : string ,
    email : string ,
    role : "admin" 
}