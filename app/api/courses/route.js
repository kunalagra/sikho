import { Plans } from "@/models/Plans";
import dbConnect from '@/utils/dbConnect';

export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  const createdPlans = await Plans.create(body);
  return Response.json(createdPlans);
}

export async function GET() {
  await dbConnect();
  const Planss = await Plans.find({});
  return Response.json(Planss);
}