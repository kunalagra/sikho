import dbConnect from '@/utils/dbConnect';
import {User} from "@/models/User";
import {Student} from "@/models/Student.js";
import {Instructor} from "@/models/Instructor.js";
import {Plan} from '@/models/Plan.js'
import {LessonPlan} from '@/models/LessonPlan.js'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?._id;
    const userdata = await User.findById(userID)
    if (userID && userdata.type=="Instructor"){
        const lesson = await Instructor.findById(userdata.userInfo).populate({
            path: 'plans',
            populate:{
                path: 'courses',
                populate: ['plan','student','assignments']
        }})
        return new Response(JSON.stringify(lesson.plans),{status: 200})

    }
    else{
        const lesson = await Student.findById(userdata.userInfo).populate({
            path: 'courses',
            populate: ['plan','instructor','assignments']
        })
        return new Response(JSON.stringify(lesson.courses),{status: 200})

    } 
}

