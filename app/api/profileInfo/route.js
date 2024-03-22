import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route.js"
import { UserInfo } from "@/models/UserInfo.js";
import {User} from "@/models/User";

export async function GET() {
    await dbConnect();

    try {
      const session = await getServerSession(authOptions);
      if (session?.user?._id){
        const user = await User.findById(session?.user?._id)
        const data = await UserInfo.findById(user.userInfo )
        return new Response(JSON.stringify(data), {status: 200})
      } 
    }catch (error) {  
        console.error(error);
        return new Response(error,{status: 500})
      }
}

export async function POST(req) {

  try {
      const session = await getServerSession(authOptions);
      const userID = session?.user?._id;
      if (userID){
          await dbConnect();
          const body = await req.json()
          const user = await User.findById(userID)
          await UserInfo.findByIdAndUpdate(user.userInfo,body )
          return new Response('User Data Updated',{status: 201})
      }
      else{
          return new Response('User Not Found',{status: 401})
      }
      
    } catch (error) {
      console.error(error);
      return new Response(error,{status: 500})
    }
}
