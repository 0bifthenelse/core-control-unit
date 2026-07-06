import { ShowroomScene } from "./ShowroomScene";

export function ShowroomPage() {
  return (
    <main className="h-screen flex flex-col pt-18">
      <div className="flex-1 min-h-0">
        <ShowroomScene />
      </div>
    </main>
  );
}
