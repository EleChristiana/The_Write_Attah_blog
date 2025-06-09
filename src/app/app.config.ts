import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  provideHttpClient(),  provideFirebaseApp(() => initializeApp({"projectId":"thewriteattahblogpost","appId":"1:894530165939:web:da7c927c01d74468d024c6","storageBucket":"thewriteattahblogpost.firebasestorage.app","apiKey":"AIzaSyCsXLUnchUq726KTvo2W-T7F9ZlbSAV2-s","authDomain":"thewriteattahblogpost.firebaseapp.com","messagingSenderId":"894530165939"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
