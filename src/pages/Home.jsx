import ActionsPanel from "../components/home/ActionsPanel";
import WelcomePanel from "../components/home/WelcomePanel";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
      {/* Welcome panel */}
      <WelcomePanel />

      {/* Actions panel */}
      <ActionsPanel />
    
    </div>
  );
}
