"use client";
import "@/app/style/nav.css";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut,useSession } from "next-auth/react";

export default function nav({ isLoggedIn, setLog, setSign }) {
  const [status, setStaus] = useState(false);
  const [visibile, setVisible] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

  const controlScroll = () => {
    if (window.scrollY >= 65) {
      setStaus(true);
      setVisible(true);
    } else if(!isLoggedIn){
      setStaus(false);
      setVisible(false);
    }
  };
  useEffect(() => {
    if(isLoggedIn) setVisible(true);
    window.addEventListener("scroll", controlScroll);
  }, []);
  const session = useSession();
  const router = useRouter();
  const onLogout = async () => {
    try {
      localStorage.clear();
      const resp = await axios.get("/api/users/logout");
      console.log("Logout Sucess", resp.data);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <nav>
        <div
          className={isLoggedIn || status ? "container-active" : "container"}
        >
          <div className="left">
            <h1>TravelIt</h1>
          </div>
          <div className="right">
            {visibile && (
              <ul>
                <li>
                  <Link className="links" href={isLoggedIn?"/home":"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="links" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="links" href="/feedback">
                    Feedback
                  </Link>
                </li>
              </ul>
            )}
            {isLoggedIn ? (
              <div className="abc">
                 <button
                    onClick={()=>{setIsOpen(!isOpen)}}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
                  >
                    <img 
                    src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" 
                    alt="Profile" className="w-8 h-8" />
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <ul className="py-1 flex flex-col">
                        <li>
                          <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link>
                        </li>
                        <hr class="dark:border-gray-700"></hr>
                        <li>
                          <Link href="/dashboard/trips" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                            My Trips
                          </Link>
                        </li>
                        <li>
                          <Link href="/chatgroups" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                            My Chat Rooms
                          </Link>
                        </li>
                        <li>
                          <a href="/dashboard/bills" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Bills</a>
                        </li>
                        <li>
                          <Link href="/dashboard/tasklist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                            My Task Lists
                          </Link>
                        </li>
                        <hr class="dark:border-gray-700"></hr>
                        <li>
                          <button
                            // className="bg-[#2563eb] text-white p-2 rounded-lg border border-slate-300
                            //   hover:border-slate-400"
                            className="px-4 py-2 text-gray-800 hover:bg-gray-200 flex"
                            onClick={onLogout}
                          >
                            <div class="mr-3 text-red-600">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" 
                                  stroke-width="2" 
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                </path>
                              </svg>
                            </div>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                
              </div>
            ) : (
              <div className="abc">
                <input
                  className="sbtn sbtn2"
                  type="submit"
                  value="Login"
                  onClick={() => {
                    setLog(true);
                  }}
                />
                <input
                  className="sbtn sbtn1"
                  type="submit"
                  value="Sign Up"
                  onClick={() => {
                    setSign(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
