import { ShowroomScene } from "./ShowroomScene";
import { ShowroomHud } from "./ShowroomHud";

export function ShowroomPage() {
  return (
    <main className="h-screen flex flex-col pt-18">
      <div className="relative flex-1 min-h-0">
        <ShowroomScene />
        <ShowroomHud />
      </div>
    </main>
  );
}
