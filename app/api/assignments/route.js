import dbConnect from '@/utils/dbConnect';
import {User} from "@/models/User";
import {Student} from "@/models/Student.js";
import {Instructor} from "@/models/Instructor.js";
import {Plan} from '@/models/Plan.js'
import {LessonPlan} from '@/models/LessonPlan.js'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"
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
            let filteredLessonPlans = lessonplans.assignments.map(lessonPlan => {
              const filteredSubmissions = lessonPlan.submissions.filter(submission => {
                  return submission.student === user.userInfo;
              });
          
              return { ...lessonPlan, submissions: filteredSubmissions };
             });
             const data = filteredLessonPlans.map(item => item._doc);
            return new Response(JSON.stringify(data),{status: 200}) 
          }
          else if (session?.user?.type==='Instructor'){
            return new Response(JSON.stringify(lessonplans),{status: 200}) 

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
      
      if (data._id){
          console.log(data);
          let query = {_id: data._id}
          let options = {new: true};
          let update = {
            submissions: data.submissions
          }
          console.log(update)
          const res = await Assignment.findOneAndUpdate(query, update, options);
          console.log(res)
          return new Response('Assignment Updated',{status: 201})

      }
      else{
        const lessonPlan = await LessonPlan.findById(data.lid)
          const assignment = await Assignment({
              title: data.title,
              description: data.description,
              end: data.end,
          })
          const newassignment = await assignment.save()
          lessonPlan.assignments.push(newassignment._id)
          await lessonPlan.save();
          return new Response('Assignment Created & Assigned',{status: 201})
      }

  }
  else if (userID && userdata.type=="Student"){
      const assignments = await Assignment.findById(data.aid)
      let solution = {
        student: userdata.userInfo,
        solution: data.solution, 
      }
      // console.log(data);
      // console.log(assignments);
      assignments.submissions.push(solution)
      await assignments.save()

      return new Response('Assignment Submitted',{status: 201})
            
  }
  else return new Response('Error',{status: 500})
}