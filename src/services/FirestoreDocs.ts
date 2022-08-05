import { getFirestore } from "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import type {
  DocumentData,
  OrderByDirection,
  WhereFilterOp,
} from "@firebase/firestore";
import {
  DocumentReference,
  FieldPath,
  orderBy as _orderBy,
  query,
  where as _where,
  writeBatch,
} from "@firebase/firestore";

const db = getFirestore();

export type _Where = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};
export type Where = _Where | _Where[];
export type OrderBy = [string, OrderByDirection?];

export class FirestoreDocs {
  readonly collectionName;
  readonly collectionRef;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  /**
   * Returns one or multiple documents depending on if "id" is defined.
   */
  async get<T>(
    id: string | undefined,
    where?: Where,
    orderBy?: OrderBy
  ): Promise<T[] | T | null> {
    if (id) {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data() as T;
      // It's time to loop trough each property and find any document reference for hydrating it.
      await this.hydrateDocumentReference(docData);
      return { id: docSnap.id, ...docData };
    }

    // @todo extract to a helper method?
    const queryParts = [];
    orderBy && queryParts.push(_orderBy(...orderBy));

    if (Array.isArray(where)) {
      if (where) {
        for (const whereItem of where) {
          queryParts.push(
            _where(whereItem.fieldPath, whereItem.opStr, whereItem.value)
          );
        }
      }
    } else {
      where &&
        queryParts.push(_where(where.fieldPath, where.opStr, where.value));
    }

    const q = query(this.collectionRef, ...queryParts);
    const docsRef = await getDocs(q);
    const docs = [];

    for (const curDocRef of docsRef.docs) {
      const docData = curDocRef.data() as T;
      // It's time to loop trough each property and find any document reference for hydrating it.
      await this.hydrateDocumentReference(docData);
      docs.push({ id: curDocRef.id, ...docData });
    }

    return Promise.resolve(docs);
  }

  async create<T>(data: T): Promise<T> {
    const newDoc = await addDoc(this.collectionRef, data);
    return { id: newDoc.id, ...data };
  }

  async update<T>(data: T, id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    return updateDoc(docRef, data);
  }

  async delete(id: string | undefined, where?: Where): Promise<void> {
    if (id) {
      const docRef = doc(db, this.collectionName, id);
      return deleteDoc(docRef);
    }

    if (where) {
      // @todo extract to a helper method?
      const queryParts = [];

      if (Array.isArray(where)) {
        if (where) {
          for (const whereItem of where) {
            queryParts.push(
              _where(whereItem.fieldPath, whereItem.opStr, whereItem.value)
            );
          }
        }
      } else {
        where &&
          queryParts.push(_where(where.fieldPath, where.opStr, where.value));
      }

      const q = query(this.collectionRef, ...queryParts);
      const docsRef = await getDocs(q);
      const batch = writeBatch(db);

      for (const curDocRef of docsRef.docs) {
        batch.delete(curDocRef.ref);
      }

      return await batch.commit();
    }
  }

  protected async hydrateDocumentReference(
    docSnap: DocumentData
  ): Promise<void> {
    for (const docSnapKey in docSnap) {
      if (docSnap[docSnapKey] instanceof DocumentReference) {
        const hydratedReference = await getDoc(
          docSnap[docSnapKey] as unknown as DocumentReference
        );
        docSnap[docSnapKey] = {
          id: hydratedReference.id,
          ...(hydratedReference.data() as DocumentData),
        };
      }
    }
  }

  /**
   * Returns the document reference.
   */
  async getDocRef(id: string): Promise<DocumentReference> {
    const docRef = doc(db, this.collectionName, id);
    return Promise.resolve(docRef);
  }
}
