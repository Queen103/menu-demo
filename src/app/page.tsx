"use client";

import { useEffect, useState } from 'react';

interface Machine {
  id: number;
  name: string;
  dailyTarget: number;
  hourTarget: number;
  actual: number;
  error: { [key: number]: boolean };
  support: { [key: number]: boolean };
  outStock: { [key: number]: boolean };
  isConnect: boolean;
}

const HomePage = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/machines');
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    // Gọi API mỗi giây
    const interval = setInterval(fetchData, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5" style={{ transform: 'scale(1, 0.93)', transformOrigin: 'top' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className={`rounded-lg border-4 shadow-lg p-0 flex flex-col items-start justify-between transform transition-all hover:scale-105 hover:shadow-2xl ${machine.isConnect ? 'bg-blue-600 border-blue-800 text-white' : 'bg-gray-400 border-gray-600 text-gray-200'
              }`}
          >
            {/* Phần chứa ID và Tên */}
            <div className={`flex w-full mb-4 border-b border-blue-700 pb-2  p-3 ${machine.isConnect ? 'bg-blue-800 border-blue-800 text-white' : 'bg-gray-400 border-gray-600 text-gray-200'
              }`}>
              <div className="text-sm font-semibold text-[31px]">{machine.id}</div>
              <div className="flex-1 text-center text-sm font-semibold text-[31px]">{machine.name}</div>
            </div>

            {/* Phần Mục Tiêu */}
            <div className="w-full mb-4 p-3">
              <div className="flex justify-between mb-2">
                <div className="text-lg font-bold">Mục Tiêu Ngày</div>
                <div className="text-2xl font-semibold">{machine.dailyTarget}</div>
              </div>
              <div className="text-sm mb-4">(Daily Target)</div>

              <div className="flex justify-between mb-2">
                <div className="text-lg font-bold">Mục Tiêu Giờ</div>
                <div className="text-2xl font-semibold">{machine.hourTarget}</div>
              </div>
              <div className="text-sm mb-4">(Hourly Target)</div>

              <div className="flex justify-between mb-2">
                <div className="text-lg font-bold">Thực Hiện</div>
                <div className="text-2xl font-semibold">{machine.actual}</div>
              </div>
              <div className="text-sm">(Actual)</div>
            </div>

            {/* Phần Trạng Thái */}
            <div className={`w-full bg-blue-700 p-3 mt-4 ${machine.isConnect ? 'bg-blue-700 border-blue-800 text-white' : 'bg-gray-400 border-gray-600 text-gray-200'
              }`}>
              <div className="flex justify-between mb-2">
                <div className="text-sm text-red-500 text-lg font-bold">Hỏng Máy</div>
                <div className="flex justify-center space-x-4">
                  {Object.keys(machine.error).map((key) => (
                    <div
                      key={key}
                      className={`relative flex items-center justify-center w-6 h-6 rounded-full ${machine.error[parseInt(key)] ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                    >
                      <span className="absolute font-semibold">{key}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <div className="text-sm text-yellow-500 text-lg font-bold">Cần Hỗ Trợ</div>
                <div className="flex justify-center space-x-4">
                  {Object.keys(machine.support).map((key) => (
                    <div
                      key={key}
                      className={`relative flex items-center justify-center w-6 h-6 rounded-full ${machine.support[parseInt(key)] ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                    >
                      <span className="absolute font-semibold">{key}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <div className="text-sm text-green-500 text-lg font-bold">Hết Hàng</div>
                <div className="flex justify-center space-x-4">
                  {Object.keys(machine.outStock).map((key) => (
                    <div
                      key={key}
                      className={`relative flex items-center justify-center w-6 h-6 rounded-full ${machine.outStock[parseInt(key)] ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                    >
                      <span className="absolute font-semibold">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
