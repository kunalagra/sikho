import dbConnect from '@/utils/dbConnect';
import {User} from "@/models/User";
import {Student} from "@/models/Student.js";
import {Instructor} from "@/models/Instructor.js";
import {Plan} from '@/models/Plan.js'
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
        const temp = inst.plans
        return new Response(JSON.stringify(data),{status: 200})
    }
    else{
        const student = await Student.findById(userdata.userInfo).populate({
            path: 'courses',
            populate: 'plan'
        })
        return new Response(JSON.stringify(inst.plans),{status: 200})

    } 
}

export async function POST(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?._id;
    const userdata = await User.findById(userID)
    if (userID && userdata.type=="Instructor"){
        const data = await req.json()
        
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
    else return new Response('Error',{status: 500})
}