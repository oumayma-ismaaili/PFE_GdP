import { useContext } from "react";
import ActionsPanel from "../components/home/ActionsPanel";
import WelcomePanel from "../components/home/WelcomePanel";
import { UserAuthContext } from "../App";

export default function Home() {
  const { user } = useContext(UserAuthContext);
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
      {/* Welcome panel */}
      <WelcomePanel user={user} />

      {/* Actions panel */}
      <ActionsPanel />
    </div>
  );
}
