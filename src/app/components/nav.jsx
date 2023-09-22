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

  const controlScroll = () => {
    if (window.scrollY >= 65) {
      setStaus(true);
      setVisible(true);
    } else {
      setStaus(false);
      setVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlScroll);
  }, []);
  const session = useSession();
  const router = useRouter();
  const onLogout = async () => {
    try {
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
                  <Link className="links" href="/home">
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
                  className="bg-[#2563eb] text-white p-2 rounded-lg border border-slate-300
                     hover:border-slate-400"
                  onClick={onLogout}
                >
                  Logout
                </button>
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
