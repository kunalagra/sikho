import dbConnect from '@/utils/dbConnect';
import {User} from "@/models/User";
import {Student} from "@/models/Student.js";
import {Instructor} from "@/models/Instructor.js";
import {Plan} from '@/models/Plan.js'
import {LessonPlan} from '@/models/LessonPlan.js'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"

export async function GET(req) {
    await dbConnect();
    // console.log(req.nextUrl)
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('id')
    // console.log(query)
    const plan = await Plan.findOne({_id: query}).populate(
        ['instructor','lessons'])
    // console.log(plan)
    return new Response(JSON.stringify(plan),{status: 200})
}