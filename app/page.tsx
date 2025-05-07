'use client';
import DisplayLinkedNFTs from "./components/DisplayLinkedNFTs";
import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const { user, loggedIn, logIn, logOut } = useAuth();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 bg-gray-100 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl px-12 py-12 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="w-full max-w-2xl mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg flex flex-col items-center shadow-sm">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span className="text-lg font-semibold text-black">
              Please{' '}
              <a
                href="https://support.meetdapper.com/hc/en-us/articles/20744347884819-Account-Linking-and-FAQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                link your Dapper wallet
              </a>{' '}
              to view your NFTs.
            </span>
          </div>
          <p className="text-black text-center text-sm">
            Learn how to make this app by completing the{' '}
            <a
              href="https://developers.flow.com/build/guides/account-linking-with-dapper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              tutorial
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-6">
          {/* Display user address or linked NFTs if logged in */}
          {loggedIn ? (
            <div className="text-lg font-semibold text-gray-800">
              Address: {user.addr}
            </div>
          ) : (
            <div className="text-lg font-semibold text-gray-800">
              After linking accounts, log in to view your linked NFTs.
            </div>
          )}

          {/* Login/Logout Button */}
          <button
            onClick={loggedIn ? logOut : logIn}
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-auto"
          >
            {loggedIn ? "Log Out" : "Log In"}
          </button>
        </div>

        {/* Display NFTs if logged in */}
        {loggedIn && <DisplayLinkedNFTs address={user.addr} />}
      </main>
    </div>
  );
}
