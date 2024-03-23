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

async function CreateLesson(planinfo,userdata, size){
    const lessons = new LessonPlan({
        instructor: planinfo.instructor,
        student: [userdata.userInfo],
        plan: planinfo._id,
        size: size,
        }
    )  
    const temp = await lessons.save()
    const stu = await Student.findById(userdata.userInfo)
    stu.lessons.push(temp._id)
    planinfo.lessons.push(temp._id)
    await stu.save()
    await planinfo.save()
    
}

export async function POST(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?._id;
    const userdata = await User.findById(userID)
    const data = await req.json()
    if (userID && userdata.type=="Instructor"){
        
        if (data.id){
            let query = {_id: data.id}
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
        const planinfo = await Plan.findById(data.planid).populate('lessons')
        if (data.plan_size===1){
            await CreateLesson(planinfo, userdata,1)
            return new Response('Student Enrolled in 1 mode',{status: 201})
        }else{
            let flag = true
            for (let i = 0; i < planinfo.lessons.length; i++) {
                if (planinfo.lessons[i].size>1 && planinfo.lessons[i].student.length<6){
                    planinfo.lessons[i].student.push(userdata.userInfo)
                    const stu = await Student.findById(userdata.userInfo)
                    stu.lessons.push(temp._id)
                    await stu.save()
                    await planinfo.save()
                    flag = false
                    break
                }
            }       
            if (flag){
                await CreateLesson(planinfo, userdata, 5)
                return new Response('Student Enrolled in the batch',{status: 201})
            }
        }
        
    }
    else return new Response('Error',{status: 500})
}