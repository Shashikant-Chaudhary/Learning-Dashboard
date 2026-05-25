import { supabase } from "@/lib/supabase";
import CourseCard from "./CourseCard";
import type { Course } from "@/types";

export default async function CourseGrid() {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <div className="col-span-full bg-red-950/30 border border-red-800/40
        rounded-2xl p-6 text-red-400 text-sm">
        Error: {error.message}
      </div>
    );
  }

  const courses = data as Course[];

  return (
    <>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </>
  );
}