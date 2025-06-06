// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { Auth, user, User } from '@angular/fire/auth';
// import { Firestore, doc, getDoc } from '@angular/fire/firestore';
// import { map, switchMap } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
//   const auth = inject(Auth);
//   const router = inject(Router);
//   const firestore = inject(Firestore);
//   const currentRoute = state.url;

//   return user(auth).pipe(
//     switchMap(userData => {
//       if (!userData) {
//         // Not logged in - redirect to login
//         router.navigate(['/login']);
//         return of(false);
//       }

//       // User is logged in, now check role if route is /dashboard (or whatever your dashboard route is)
//       if (currentRoute.startsWith('/dashboard')) {
//         // Check user role in Firestore
//         const userDocRef = doc(firestore, `users/${userData.uid}`);
//         return getDoc(userDocRef).then(docSnap => {
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             const role = data?.['role'] ?? 'user';
//             if (role === 'owner') {
//               return true;  // Owner can access dashboard
//             } else {
//               router.navigate(['/']); // Redirect non-owner user to home page
//               return false;
//             }
//           } else {
//             router.navigate(['/']); // No role data found, redirect to home
//             return false;
//           }
//         });
//       } else {
//         // For other routes like '/', '/about', '/contact' allow if logged in
//         return of(true);
//       }
//     })
//   );
// };


import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { switchMap, map } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const auth = inject(Auth);
  const router = inject(Router);
  const firestore = inject(Firestore);
   const authService = inject(AuthService);  

  return user(auth).pipe(
    switchMap(currentUser => {
      if (!currentUser) {
        router.navigate(['/login']);
        return of(false);  // Return observable of false
      }

      // Get role from Firestore
      const userDocRef = doc(firestore, `users/${currentUser.uid}`);
      return from(getDoc(userDocRef)).pipe(
        map(docSnap => {
          if (!docSnap.exists()) {
            router.navigate(['/login']);
            return false;
          }
          const data = docSnap.data() as { role?: string };  // Type casting here
          const role = data['role'] ?? 'user';

          if (role === 'owner') {
            // Allow owner to access dashboard
            return true;
          } else {

               authService.showAlert('You are not an owner and cannot access the dashboard.');
            // Not owner, redirect to home or show error
            router.navigate(['/']);
            return false;
          }
        })
      );
    })
  );
};
