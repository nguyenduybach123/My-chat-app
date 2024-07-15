import React from "react";
import { collection, where, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "../firebase/config";

export const useFirestore = (collecttype, conditions) => {

    const [document,setDocument] = React.useState([])
    
    React.useEffect(() => {
        const collectionRef = collection(db,collecttype);
        let firebaseQuery = query(collectionRef, orderBy('createdAt'));

        /*
            {
                fieldName: 'abc',
                operator: '==',
                compareValue: 'xyz'
            }
        */
        
        if(conditions.length > 0) {
            conditions.forEach(condition => {
                if(!condition.compareValue || !condition.compareValue.length ) {
                    return;
                }
                firebaseQuery = query(firebaseQuery,where(condition.fieldName,condition.operator,condition.compareValue));
            }) 
        }

        
        const unsubscribe = onSnapshot(firebaseQuery,(snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocument(data);
        });

        return unsubscribe;
    },[collecttype,conditions]);

    return document;
}

export default useFirestore;