'use client';
import ChildAddressDisplay from "./components/ChildAddressDisplay";
import ParentAccountsDisplay from "./components/ParentAccountsDisplay";
import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const { user, loggedIn, logIn, logOut } = useAuth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {
          !loggedIn ? (
            <button onClick={() => logIn()} className="px-4 py-2 text-white bg-black rounded-md">
              Log In
            </button>
          ) : (<div>
            <div>{user.addr}</div>
            <ChildAddressDisplay address={user.addr} />

            <button onClick={() => logOut()} className="px-4 py-2 text-white bg-black rounded-md">
              Log Out
            </button></div>
          )
        }
      </main>
    </div>
  );
}
