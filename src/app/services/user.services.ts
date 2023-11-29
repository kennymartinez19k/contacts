import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, Subject } from 'rxjs';
import { Firestore, collection, addDoc, query, where, getDocs, doc, getDoc, setDoc, deleteDoc, orderBy, startAt, endAt } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private searchResults = new BehaviorSubject<any[]>([])
  searchTerm: string = ''
  private _refresh$ = new Subject<void>()


  constructor(private firestore: Firestore, private loading: LoadingController) {}

  get refresh$() {
    return this._refresh$
  }

  async addUser(user: User) {
    const userRef = collection(this.firestore, 'contactos');
    const docRef = await addDoc(userRef, user)
    this._refresh$.next()
    return docRef.id
  }

  getUsers(): Observable<User[]> {
    const q = query(collection(this.firestore, 'contactos'));

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as User;
          users.push(data);
        });
        return users;
      })
    );
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const docRef = doc(this.firestore, 'contactos', userId)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      return docSnap.data() as User
    } else {
      return undefined
    }
  }

  async updateUser(userId: string, user: User): Promise <void> {
    const userRef = doc(this.firestore, 'contactos', userId)
    this._refresh$.next()
    return setDoc(userRef, user, {merge: true})
  }

  async deleteUser(userId: string | undefined): Promise<void> {
    if(userId) {
      const userRef = doc(this.firestore, 'contactos', userId)
      await deleteDoc(userRef)
    } else {
      console.log('ERROR al eliminar SERVICIO')
    }
  }

  async searchUser(searchTerm: any) {
    const userRef = collection(this.firestore, 'contactos')
    const itemLower = searchTerm.toLowerCase()
    const q = query(
      userRef,
      where('name', '>=', itemLower),
      where('name', '<=', itemLower + '\uf8ff'),
      orderBy('name'),
      startAt(itemLower),
      endAt(itemLower + '\uf8ff')
    );
  
    try {
      const querySnap = await getDocs(q)
      const results = querySnap.docs.map(doc => doc.data())
      console.log(results)
      this.searchResults.next(results)
    } catch (error) {
      console.log('error al buscar usuario ', error)
    }
   }

   getSearchResults() {
    return this.searchResults.asObservable()
   }

}

interface User {
  name: string
  lastName: string
  position: string
  role: string
  file: string
  hourIn: string
  hourOut: string
  phone: Number
  userId: string
}