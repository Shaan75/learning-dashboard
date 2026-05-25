import { CoursesSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <section className="min-h-screen p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      <CoursesSkeleton />
    </section>
  );
}
