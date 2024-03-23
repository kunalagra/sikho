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
        const inst = await Instructor.findById(userdata.userInfo).populate({
            path: 'plans'
        })
        return new Response(JSON.stringify(inst.plans),{status: 200})
    }   
    else{
        const data = await Plan.find().populate('instructor')
        return new Response(JSON.stringify(data),{status: 200})    
    } 
}

export async function POST(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?._id;
    const userdata = await User.findById(userID)
    const data = await req.json()
    if (userID && userdata.type=="Instructor"){
        
        if (data._id){
            let query = {_id: data._id}
            let options = {new: true};
            await Plan.findOneAndUpdate(query, data, options);
            return new Response('Plan Updated',{status: 201})

        }
        else{
            data.instructor = userdata.userInfo
            const plan = await Plan(
                data
            )
            const newplan = await plan.save()
            const inst = await Instructor.findById(userdata.userInfo)
            inst.plans.push(newplan._id);
            await inst.save();
            return new Response('Plan Inserted',{status: 201})
        }

    }
    else if (userID && userdata.type=="Student"){
        // to-do balance add & subtract for instructors
        const planinfo = await Plan.findById(data.planid).populate('c')
        if (data.plan_size===1){
            const lesson = new LessonPlan({
                instructor: planinfo.instructor,
                student: userdata.userInfo,
                plan: data.planid,
                size: 1,
                }
            )  
            const temp = await lesson.save()
            const stu = await Student.findById(userdata.userInfo)
            stu.courses.push(temp._id)
            const inst = await Instructor.findById(planinfo.instructor)
            inst.courses.push(temp._id)
            await stu.save()
            await inst.save()
            return new Response('Student Enrolled in 1 batch',{status: 201})
        }else{
            const data = planinfo.courses.filter((data) => { 
                if (data.size > 1  && data.student.length<6) {
                    return true; 
                } 
              }); 
            
        }
        
    }
    else return new Response('Error',{status: 500})
}