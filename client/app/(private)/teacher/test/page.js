"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown, ChevronUp, Check, X, Clock } from "lucide-react";
import { getClientBuildManifest } from "next/dist/client/route-loader";
import Loading from "@/app/components/loading";

export default function ClassManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClass, setExpandedClass] = useState(0);

  const [showHistory, setShowHistory] = useState(false);
  const [showStudentList, setShowStudentList] = useState(true);

  const [presentClassesList, setPresentclassList] = useState([]);
  const [OldclassList, setOldclassList] = useState([]);
  const [loading, setLoading] = useState(true);
  // Empty search function - you can connect to your database
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Your database search logic will go here
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getClassList = async () => {
      const res = await fetch("http://localhost:3030/teacher/getClassList", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      // setPresentclassList(data.workshop);
      setPresentclassList(data.present);
      setOldclassList(data.old);
    };
    getClassList();
  }, []);

  useEffect(() => {
    console.log("Updated classList:", presentClassesList);
    setLoading(false);
  }, [presentClassesList, OldclassList]);

  // Sample data - replace with your actual data
  const currentClass = {
    name: "Sexy Jazz - Cardio",
    level: "Adv. Beginner",
    time: "7:30PM - 9:00PM",
    room: "X",
    date: "2023/03/18 (Sat)",
    students: [
      { id: 1, name: "Olivia", phone: "+852 2848 5838", attendance: "present" },
      { id: 2, name: "Emma", phone: "+852 2345 7849", attendance: "present" },
      {
        id: 3,
        name: "Charlotte",
        phone: "+852 8435 9909",
        attendance: "present",
      },
      { id: 4, name: "Amelia", phone: "+852 2848 5838", attendance: "present" },
      { id: 5, name: "Sophia", phone: "+852 2848 5838", attendance: "absent" },
      { id: 6, name: "Mia", phone: "+852 2345 7849", attendance: "pending" },
      {
        id: 7,
        name: "Isabella",
        phone: "+852 2848 5909",
        attendance: "present",
      },
      { id: 8, name: "Ava", phone: "+852 2848 5909", attendance: "present" },
    ],
  };

  const historyClasses = [
    {
      name: "Sexy Jazz - Cardio",
      level: "Adv. Beginner",
      time: "7:30PM - 9:00PM",
      room: "X",
      date: "2023/03/24 (Mon)",
      students: [],
    },
    {
      name: "Sexy Jazz - Cardio",
      level: "Adv. Beginner",
      time: "7:30PM - 9:00PM",
      room: "X",
      date: "2023/03/17 (Mon)",
      students: [],
    },
    {
      name: "Sexy Jazz - Cardio",
      level: "Adv. Beginner",
      time: "7:30PM - 9:00PM",
      room: "X",
      date: "2023/03/10 (Mon)",
      students: [],
    },
    {
      name: "Sexy Jazz - Cardio",
      level: "Adv. Beginner",
      time: "7:30PM - 9:00PM",
      room: "X",
      date: "2023/03/03 (Mon)",
      students: [],
    },
  ];

  return (
    <div className="w-4/5">
      {/* Search Bar */}
      <div className="p-2 sticky top-0 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full pr-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Current Class */}
      {!loading &&
        Object.keys(presentClassesList).length > 0 &&
        presentClassesList.map((classItem, index) => (
          <div className=" rounded-lg p-6 border-1 border-gray-400 mb-5">
            <div className="p-4 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Workshop Class
              </h2>
              <div className="border-t border-black-200 pt-2">
                <p className="text-sm">
                  {classItem.style} -{" "}
                  <span className="text-gray-500">
                    Level: {classItem.level}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Time: {classItem.startTime} - {classItem.endTime} Room:{" "}
                  {classItem.room.split(" ")[1]}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {classItem.date.slice(0, 10)}
                </p>
              </div>
            </div>

            {/* Student List Toggle */}
            <div className="p-4 bg-gray-100 flex justify-center">
              <button
                className="flex items-center text-gray-700"
                onClick={() => setShowStudentList(!showStudentList)}
              >
                <p className="font-semibold">Student Name List</p>
                {showStudentList ? (
                  <ChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>
            </div>

            {/* Student List */}
            {showStudentList && (
              <div className="bg-white mt-3">
                <div className="px-4 py-2 flex justify-between items-center border-t border-b border-gray-200 bg-gray-50">
                  <div className="text-sm font-medium">Student Name</div>
                  <div className="text-sm font-medium">Tel/Phone</div>
                  <div className="text-sm font-medium">Attendance</div>
                </div>
                <div className="divide-y divide-gray-200">
                  {currentClass.students.map((student) => (
                    <div
                      key={student.id}
                      className="px-4 py-3 flex justify-between items-center"
                    >
                      <div className="text-sm">
                        {student.id}. {student.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.phone}
                      </div>
                      <div>
                        {student.attendance === "present" && (
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-500" />
                          </div>
                        )}
                        {student.attendance === "absent" && (
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-red-500" />
                          </div>
                        )}
                        {student.attendance === "pending" && (
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

      {/* History Toggle */}
      <div className="p-4 bg-gray-100 mt-3 border-t border-gray-200 flex justify-center">
        <button
          className="flex items-center text-gray-700"
          onClick={() => setShowHistory(!showHistory)}
        >
          <p className="font-semibold">History</p>

          {showHistory ? (
            <ChevronUp className="ml-1 w-4 h-4" />
          ) : (
            <ChevronDown className="ml-1 w-4 h-4" />
          )}
        </button>
      </div>

      {/* History Classes */}
      {showHistory && (
        <div className="divide-y divide-gray-200">
          {historyClasses.map((historyClass, index) => (
            <div key={index} className="bg-white">
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Regular Class
                </h2>
                <div className="border-t border-gray-200 pt-2">
                  <p className="text-sm">
                    {historyClass.name} -{" "}
                    <span className="text-gray-500">
                      Level: {historyClass.level}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {historyClass.time} - Room: {historyClass.room}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {historyClass.date}
                  </p>
                </div>
              </div>
              <div
                className="px-4 py-2 flex justify-between items-center border-t border-gray-200 bg-gray-50"
                onClick={() =>
                  setExpandedClass(expandedClass === index ? -1 : index)
                }
              >
                <div className="text-sm font-medium">Student Name / Last</div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
