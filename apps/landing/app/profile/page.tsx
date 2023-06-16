"use client";

import React, { useState, useEffect } from "react";

type Profile = {
  data: {
    user: {
      createdAt: string;
      id: string;
      photo: string;
      pubkey: string;
      role: string;
      updatedAt: string;
      verified: boolean;
    };
  };
  status: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [data, setData] = useState<any | null>(null);

  const logout = async () => {
    const response = await fetch("https://127.0.0.1:7443/api/logout", {
      method: "GET",
      credentials: "include",
    });
    const data = response.json();
    setData(data);
  };

  useEffect(() => {
    fetch("https://127.0.0.1:7443/api/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, []);

  if (profile) {
    const { data } = profile as Profile;
    const { user } = data;
    const { pubkey } = user;

    return (
      <div className="flex grow items-center justify-center text-xl bg-slate-200 dark:bg-slate-900">
        Profile pubkey:
        <span className="mx-2 font-bold">{pubkey}</span>
        <button
          className="bg-black text-white mx-2 px-4 py-2 rounded-xl hover:bg-slate-800 hover:text-gray-50"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex grow items-center justify-center bg-slate-200 dark:bg-slate-900">
          Not profile information
        </div>
        <button className="flex grow items-center justify-center text-xl bg-slate-200 dark:bg-slate-900">
          Logout
        </button>
      </>
    );
  }
}
