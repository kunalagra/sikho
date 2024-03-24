import dbConnect from '@/utils/dbConnect';
import {User} from "@/models/User";
import {Student} from "@/models/Student.js";
import {Instructor} from "@/models/Instructor.js";
import {Plan} from '@/models/Plan.js'
import {LessonPlan} from '@/models/LessonPlan.js'
import {Schedule} from '@/models/Schedule.js'

import path from "path";
import { writeFile } from "fs/promises";
const { v4: uuidv4 } = require('uuid');
import { headers } from 'next/headers'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?._id;
    if (userID){
        const user = await User.findById(userID)
        const Model = user.type ==="Student" ? Student : Instructor 
        const data = await Model.findById(user.userInfo).populate('schedules')
        return new Response(JSON.stringify(data),{status: 200})    
    }
}

export async function POST(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?._id;
    const user = await User.findById(userID)
    if (userID && userdata.type=="Instructor"){
        const data = await req.json()

        if (!data._id){
            const newschedule = new Schedule(
                data
            )
            const save = await newschedule.save()
            const inst = await Instructor.findById(user.userInfo)
            inst.schedules.push(save._id)
            await inst.save()
            const planinfo = await LessonPlan.findById(data.lessons)
            const stu = await Student.findById(planinfo.student[0]._id)
            stu.schedules.push(save._id)
            await stu.save()
            return new Response('Schedule Created',{status: 201})
        }
       else{
        let query = {_id: data._id}
        let options = {new: true};
        await Schedule.findOneAndUpdate(query, data, options);
        return new Response('Schedule Updated',{status: 201})
       } 
    }
    else return new Response('Error',{status: 500})
}