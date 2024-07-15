import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (collecttype, data) => {
    let docRef = null;
    try {
        docRef = await addDoc(collection(db,collecttype), {
        ...data,
        createdAt: serverTimestamp()
        });
    }
    catch(err) {
        console.log(err);
    }
    return docRef;
}

export const deleteDocument = async (collecttype, id) => {
    if(id == null) {
        return;
    }
    try {
        const docRef = await deleteDoc(doc(db,collecttype,id));
    }
    catch(err) {
        console.log(err);
    }
}

export const updateDocument = async (collecttype,id,data) => {

    try {
        const q = query(collection(db, collecttype), where("uid", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((item) => {
            const docRef = updateDoc(doc(db,collecttype,item.id),data);
            return;
        });
        
    }
    catch(err) {
        console.log(err)
    }
}

export const getDocument = async (collecttype,id) => {
    let result = null;
    try {
        const q = query(collection(db, collecttype), where("uid", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result = doc.data();
            return;
        });
        return result;
    }
    catch(err) {
        console.log(err)
    }
    return 1;
}

export const getDocuments = async (collecttype) => {
    let result = [];
    try {
        const q = query(collection(db, collecttype));
        const querySnapshot = getDocs(q);
        querySnapshot.then((res) => {
            res.forEach(element => {
                result.push(element.data());
            })
            return result;
        })
    }
    catch(err) {
        console.log(err)
    }
    return result;
}



export default addDocument;