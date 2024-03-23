import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = await req.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
  });
  return new Response(JSON.stringify({ paymentIntent }), {
    headers: { "Content-Type": "application/json" },
  });
}
