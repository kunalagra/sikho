import Banner from '../components/student/Banner/Banner';
import Companies from '../components/student/Companies/Companies';
import Tabs from '../components/student/Courses/Courses';
import Mentor from '../components/student/Mentor/Mentor';
import Students from '../components/student/Students/Students';
import Newsletter from '../components/student/Newsletter/Newsletter';
import Category from '../components/student/Categories/Category';
import Instructor from '../components/Instructor/Instructor';
import Plans from '../components/Plans/Plans';


export default function Home() {
  return (
    <main>
      <Banner />
      <Companies />
      <Category/>
      <Tabs />
      <Mentor />
      <Instructor/>
      <Students />
      <Newsletter />
 
    </main>
  )
}
