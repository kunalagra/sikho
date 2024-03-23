const Stripe = require('stripe');

export async function POST(req) {
  const stripe =  Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  const { amount } = await req.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'inr',
    description: 'Software development services',
    
    
  });
  return new Response(JSON.stringify({ paymentIntent }), {
    headers: { "Content-Type": "application/json" },
  });
}
