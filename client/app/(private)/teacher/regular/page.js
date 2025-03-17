"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";

export default function Regular() {
  const [isLoading, setIsLoading] = useState(false); // Will change it later
  const [username, setUserName] = useState(null);

  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-2xl mx-auto p-4 space-y-4 border-amber-2">
          {/* Regular Classes */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6">Regular Classes</h2>
            <div className="space-y-6">
              <div className="flex justify-start gap-5">
                <div>"Photo"</div>
                <div>
                  <div>name</div>
                  <div>Level:</div>
                  <div>Date:</div>
                  <div>Time:</div>
                  <div>Room:</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
