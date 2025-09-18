import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authErrorFriendly'
})
export class AuthErrorFriendlyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    switch (value) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/invalid-credential':
        return 'Invalid credentials.';
      case 'auth/missing-password':
        return 'No password provided.';
      case 'auth/passwords-do-not-match':
        return 'Passwords do not match.';
      case 'auth/weak-password':
        return 'Please enter a stronger password.';
      case 'auth/email-already-in-use':
        return 'Email address is already in use.';
      default:
        console.log('Unknown error code:', value);
        // return 'An unknown error occurred. Please try again later.';
        return value;
    }
  }

}
