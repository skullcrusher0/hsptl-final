

export interface User {
    uid: string;
   // displayName:string;
   name:string;
    email: string;
    contact: number;
    location: string;
    gender: string;
    dateOfBirth:string;
    language:string,
    photoURL?: string;
    emailVerified: boolean;

}

export interface Doctor {
    did: string;
  //displayName:string;
 name :string;
    email: string;
    location: string;
    contact: number;
    gender:string;
    dateOfBirth:string;
    language:string,
    experience:number,
    docType:string;
    photoURL?: string;
    emailVerified: boolean;
    point:any;

}

export interface Post {
    title: string;
    photoURL?: string;
    content: string;
   // tags:any;
    author_id: string;
    point:any;
}

export interface Event {
    title: string;
    photoURL?: string;
    content: string;
    link:string;
    point:any;
   // author_id: string;
}

