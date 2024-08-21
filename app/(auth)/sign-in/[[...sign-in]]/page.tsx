import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <header>
      <SignIn />
    </header>
  );
}
