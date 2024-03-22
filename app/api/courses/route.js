import { Plan } from "@/models/Plan";
import dbConnect from '@/utils/dbConnect';

export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  const createdPlan = await Plan.create(body);
  return Response.json(createdPlan);
}

export async function GET() {
  await dbConnect();
  const Plans = await Plan.find({});
  return Response.json(Plans);
}