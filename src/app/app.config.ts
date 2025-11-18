
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

 const firebaseConfig = {
    apiKey: "AIzaSyAUBTElqmaIPlojdx5BM8COmV4bMPTpRQE",
    authDomain: "vidas-movil.firebaseapp.com",
    projectId: "vidas-movil",
    storageBucket: "vidas-movil.firebasestorage.app",
    messagingSenderId: "751698081221",
    appId: "1:751698081221:web:3dccbfa8d8116c199547ac"
  };


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};