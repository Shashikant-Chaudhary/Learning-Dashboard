import { Suspense } from "react";
import Profile from "./Profile";
import ActivityTile from "./ActivityTile";
import CourseGrid from "./CourseGrid";
import Skeleton from "./Skeleton";
import GridClient from "./GridClient";

export default function Grid() {
  return (
    <GridClient>
      <Profile />
      <ActivityTile />
      <Suspense fallback={<Skeleton />}>
        <CourseGrid />
      </Suspense>
    </GridClient>
  );
}