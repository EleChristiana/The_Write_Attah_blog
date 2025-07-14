import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, GoogleAuthProvider, signInWithPopup, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';  


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private firestore = inject(Firestore);

  private userSignal = toSignal(user(this.auth));
  public user: Signal<User | undefined> = computed(() => {
    const currentUser = this.userSignal();
    return currentUser ?? undefined;
  });

  private async setUserRoleIfNotExists(uid: string, role: string = 'user') {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, { role });
    }
  }

  private async setOwnerRole(uid: string) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userDocRef, { role: 'owner' }, { merge: true });
  }

  public async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      if (result.user) {
        const uid = result.user.uid;

        console.log('Logged in user UID:', uid);

        if (uid === environment.ownerUid) {
          await this.setOwnerRole(uid);
        } else {
          await this.setUserRoleIfNotExists(uid, 'user');
        }

        this.router.navigate(['/']);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  public async logout() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  public async getUserRole(uid: string): Promise<string | null> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      return data['role'] ?? null;
    }
    return null;
  }

  private alertSubject = new BehaviorSubject<string | null>(null);
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string) {
    this.alertSubject.next(message);
    setTimeout(() => this.clearAlert(), 5000);
  }

  clearAlert() {
    this.alertSubject.next(null);
  }

  constructor() {}
}



