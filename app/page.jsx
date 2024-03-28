
import Banner from '../components/student/Banner/Banner';
import Companies from '../components/student/Companies/Companies';
import Tabs from '../components/student/Courses/Courses';
import Mentor from '../components/student/Mentor/Mentor';
import Students from '../components/student/Students/Students';
import Newsletter from '../components/student/Newsletter/Newsletter';
import Instructor from '../components/instructor/Instructor';
import SearchBar from '@/components/student/Banner/SearchBar';


import IBanner from '@/components/instructor/IBanner';
import IDashboard from '@/components/instructor/IDashboard';
import ICourses from '@/components/instructor/ICourses';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';


export default async function Page() {

  const session = await getServerSession(authOptions);
  const isUser = session?.user?.type;

  // console.log(session)

  if (isUser === "Instructor") {
    return (
    <main className='w-full'>
      <div className='flex flex-col'>
        <IBanner />
        <IDashboard />
        <ICourses />
      </div>
    </main>
    )
  }
  
  return (
      <main>
        <SearchBar/>
        <Banner />
      
        <Companies />
        <Tabs />
        <Mentor />
        <Instructor/>
        <Students />
        <Newsletter />
      </main>
  )
}
