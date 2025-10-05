

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#0f1629] to-[#0a0e27] p-4">
      <SignIn routing="hash" />
    </div>
  );
}
