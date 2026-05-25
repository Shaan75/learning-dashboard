import { Suspense } from "react";
import { getCourses } from "@/lib/data";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { CoursesSkeleton } from "@/components/ui/Skeletons";

// Server Component – fetches data from Supabase
async function CoursesLoader() {
  const courses = await getCourses();
  return <BentoGrid courses={courses} />;
}

export default function DashboardPage() {
  return (
    <section className="min-h-screen p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesLoader />
      </Suspense>
    </section>
  );
}
