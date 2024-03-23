import Banner from '../components/student/Banner/Banner';
import Companies from '../components/student/Companies/Companies';
import Tabs from '../components/student/Courses/Courses';
import Mentor from '../components/student/Mentor/Mentor';
import Students from '../components/student/Students/Students';
import Newsletter from '../components/student/Newsletter/Newsletter';
import IBanner from '@/components/instructor/IBanner';
import IDashboard from '@/components/instructor/IDashboard';
import ICourses from '@/components/instructor/ICourses';

export default function Home() {

  const isUser = false;

  if (isUser) {
    return (
      <main>
        <Banner />
        <Companies />
        <Tabs />
        <Mentor />
        <Students />
        <Newsletter />
      </main>
    )
  }
  
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
