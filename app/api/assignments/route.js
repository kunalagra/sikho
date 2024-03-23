import dbConnect from '@/utils/dbConnect';
import {User} from "@/models/User";
import {Student} from "@/models/Student.js";
import {Instructor} from "@/models/Instructor.js";
import {Plan} from '@/models/Plan.js'
import {LessonPlan} from '@/models/LessonPlan.js'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"
import { TRACE_OUTPUT_VERSION } from 'next/dist/shared/lib/constants.js';
import { Assignment } from '@/models/Assignment.js';

export async function GET(req) {
    await dbConnect();

    try {
        const session = await getServerSession(authOptions);
        const userID = session?.user?._id
        const searchParams = req.nextUrl.searchParams
        // get the LessonPlan's id
        const query = searchParams.get('id')
        const lessonplans = await LessonPlan.findById(query).populate({
          path: 'assignments',
          populate: 'submissions'
        })

        if (session?.user?._id){
          if (session?.user?.type==='Student'){
            const user = await User.findById(userID)
            let filteredLessonPlans = lessonplans.assigned.map(lessonPlan => {
              const filteredSubmissions = lessonPlan.submissions.filter(submission => {
                  return submission.student === user.userInfo;
              });
          
              return { ...lessonPlan, submissions: filteredSubmissions };
             });
          
            return new Response(JSON.stringify(filteredLessonPlans.assigned),{status: 200}) 
          }
          else if (session?.user?.type==='Instructor'){
            return new Response(JSON.stringify(lessonplans.assigned),{status: 200}) 

          }
        }
      } catch (error) {
        console.error(error);
        return new Response(error,{status: 500}) // Handle any errors
      }
}


export async function POST(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const userID = session?.user?._id;
  const userdata = await User.findById(userID)
  const data = await req.json()
  if (userID && userdata.type=="Instructor"){
      
      if (data.aid){
          let query = {_id: data.aid}
          let options = {new: true};
          await Assignment.findOneAndUpdate(query, data, options);
          return new Response('Assignment Updated',{status: 201})

      }
      else{
        const lessonPlan = await LessonPlan.findById(data.lid)
        
          const assignment = await Assignment({
              title: data.title,
              description: data.description,
              end: data.date,
          })


          const newassignment = await assignment.save()
          lessonPlan.assignments.push(newassignment._id)
          await lessonPlan.save();
          return new Response('Assignment Created & Assigned',{status: 201})
      }

  }
  else if (userID && userdata.type=="Student"){
      const assigments = await Assignment.findById(data.aid)
      let solution = {
        student: userdata._id,
        solution: data.solution, 
      }
      assigments.submission.push(solution)

      return new Response('Assignment Submitted',{status: 201})
            
  }
  else return new Response('Error',{status: 500})
}