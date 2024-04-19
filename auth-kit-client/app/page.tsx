"use client";
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useEffect, useState } from "react";

export default function Home() {
  useRedirect("/login");
  const {
    logoutUser,
    user,
    handlerUserInput,
    userState,
    updateUser,
    emailVerification,
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;

  // state
  const [isOpen, setIsOpen] = useState(false);

  // function
  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="py-[2rem] mx-[10rem]">
      <header className="flex justify-between">
        <h1 className="text-[2rem] font-bold">
          Welcome <span className="text-red-600">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="w-[40px] h-[40px] rounded-full"
          />
          {!isVerified && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={emailVerification}
            >
              Verify Account
            </button>
          )}

          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>

        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-[#2ECC71] text-white rounded-md"
          >
            Update Bio
          </button>
        </h1>

        {isOpen && (
          <form className="mt-4 max-w-[400px] w-full">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#999]">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
                onChange={(e) => handlerUserInput("bio")(e)}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4 px-4 py-2  bg-blue-500 text-white rounded-md"
            >
              Update Bio
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
