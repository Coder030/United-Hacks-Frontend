'use client';
import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase'; // import from your firebase.js
import { BarWave, Hypnosis, Messaging, Spin, TwinSpin } from "react-cssfx-loading";
// import BarWave from "react-cssfx-loading/lib/BarWave";

<BarWave />

function Leaderboard() {
  const [districts, setDistricts] = useState({}); // Initialize as an empty object
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const d = ref(database, 'Main/Districts');
    
    onValue(d, (snapshot) => {
      const fetchedData = snapshot.val();
      console.log(fetchedData); 
      setDistricts(fetchedData); 
      setLoad(false);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [originalDistricts] = useState(districts); // Original data for reset
  const [currentPage, setCurrentPage] = useState(1);
  const districtsPerPage = 10;

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter districts based on the district name
    const filteredDistricts = Object.keys(originalDistricts).filter((district) =>
      district.toLowerCase().startsWith(query.toLowerCase())
    ).reduce((obj, district) => {
      obj[district] = originalDistricts[district];
      return obj;
    }, {});

    setDistricts(filteredDistricts);
  };

  const handleReset = () => {
    setDistricts(originalDistricts);
    setSearchQuery('');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Sorting the districts based on score
  const sortedDistricts = Object.keys(districts)
    .map(district => ({
      district,
      ...districts[district]
    }))
    .sort((a, b) => b.score - a.score);

  // Assign ranks based on sorted scores
  sortedDistricts.forEach((district, index) => {
    district.rank = index + 1;
  });

  const totalPages = Math.ceil(sortedDistricts.length / districtsPerPage);
  const paginatedDistricts = sortedDistricts.slice((currentPage - 1) * districtsPerPage, currentPage * districtsPerPage);

  return (
    <div className="min-h-[90%] flex justify-center">
      {!load && <div className="rounded-lg max-w-[90%] w-full p-8 bg-white mt-[20px]">
        <div className='flex'>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 mr-[20px]">Leaderboard</h1>
          <div className="flex justify-center mb-6"> 
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by district..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {searchQuery && (
                <button
                  onClick={handleReset}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  X
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-auto text-[20px]">
          <table className="w-full table-auto text-gray-800">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-[20px] font-medium">Rank</th>
                <th className="px-4 py-2 text-left text-[20px] font-medium">District</th>
                <th className="px-4 py-2 text-left text-[20px] font-medium">Email</th>
                <th className="px-4 py-2 text-left text-[20px] font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDistricts.map((district) => (
                <tr key={district.rank} className={`border-b ${district.rank <= 3 ? 'text-[20px]' : 'text-[17px]'} ${district.rank <= 1 ? "bg-[#FFD700]" : ''} ${district.rank === 2 ? "bg-[#D8D8D8]" : ''} ${district.rank === 3 ? "bg-[#E4953C]" : ''}`} >
                  <td className="px-4 py-2">{district.rank}</td>
                  <td className="px-4 py-2">{district.district}</td>
                  <td className="px-4 py-2">{district.email}</td>
                  <td className="px-4 py-2">{district.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 mx-2"
          >
            {"<"}
          </button>
          <span className="px-4 py-2 text-gray-600">{currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 mx-2"
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>}
      {load &&
      <div className='flex items-center h-screen'>
        <Messaging color="grey" width="20px" height="20px" duration="0.5s" />

      </div>
      }
    </div>
  );
}

export default Leaderboard;
