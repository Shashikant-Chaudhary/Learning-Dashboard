import Sidebar from "@/components/Sidebar";
import Grid from "@/components/Grid";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <Grid />
      </main>
    </div>
  );
}