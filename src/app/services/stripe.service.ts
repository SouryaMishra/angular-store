import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  async checkout(stripeKey: string, sessionId: any) {
    const stripe = await loadStripe(stripeKey);
    stripe?.redirectToCheckout({
      sessionId,
    });
  }
}
