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
  const [previousMachinesState, setPreviousMachinesState] = useState<Map<number, Machine>>(new Map());
  const [isSpeaking, setIsSpeaking] = useState(false); // Trạng thái đang phát âm thanh

  // Hàm phát voice
  const speakData = (machine: Machine, changeType: string, key: number) => {
    const message = ` ID ${machine.id} đã thay đổi trạng thái ${changeType} tại máy số ${key}.`;
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'vi-VN'; // Chọn ngôn ngữ Việt Nam cho giọng đọc

    // Đặt sự kiện khi phát xong
    speech.onend = () => {
      setIsSpeaking(false); // Đặt trạng thái khi âm thanh phát xong
    };

    window.speechSynthesis.speak(speech);
    setIsSpeaking(true); // Đặt trạng thái đang phát âm thanh
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/machines');
        const data = await response.json();

        // So sánh với trạng thái trước đó để phát hiện thay đổi
        const newMachinesState = new Map(previousMachinesState);

        data.forEach((machine: Machine) => {
          const previousMachine = previousMachinesState.get(machine.id);

          // Kiểm tra nếu có sự thay đổi trạng thái Hỏng, Cần hỗ trợ hoặc Hết hàng
          if (previousMachine) {
            // Kiểm tra trạng thái "error"
            Object.keys(machine.error).forEach((key) => {
              const keyInt = parseInt(key);
              if (machine.error[keyInt] !== previousMachine.error[keyInt]) {
                const changeType = machine.error[keyInt] ? 'Hỏng máy' : 'Khôi phục';
                if (!isSpeaking) {
                  speakData(machine, changeType, keyInt);
                }
              }
            });

            // Kiểm tra trạng thái "support"
            Object.keys(machine.support).forEach((key) => {
              const keyInt = parseInt(key);
              if (machine.support[keyInt] !== previousMachine.support[keyInt]) {
                const changeType = machine.support[keyInt] ? 'Cần hỗ trợ' : 'Khôi phục hỗ trợ';
                if (!isSpeaking) {
                  speakData(machine, changeType, keyInt);
                }
              }
            });

            // Kiểm tra trạng thái "outStock"
            Object.keys(machine.outStock).forEach((key) => {
              const keyInt = parseInt(key);
              if (machine.outStock[keyInt] !== previousMachine.outStock[keyInt]) {
                const changeType = machine.outStock[keyInt] ? 'Hết hàng' : 'Khôi phục hàng';
                if (!isSpeaking) {
                  speakData(machine, changeType, keyInt);
                }
              }
            });
          }

          // Cập nhật trạng thái máy mới vào state nếu có sự thay đổi
          newMachinesState.set(machine.id, machine);
        });

        // Cập nhật trạng thái máy mới vào state
        setPreviousMachinesState(newMachinesState);
        setMachines(data);  // Cập nhật máy với dữ liệu mới

      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    // Gọi API mỗi giây một lần để cập nhật mục tiêu mà không làm gián đoạn âm thanh
    const intervalId = setInterval(() => {
      if (!isSpeaking) {
        fetchData();
      }
    }, 1000); // Gọi API mỗi giây (1000ms)

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);

  }, [isSpeaking, previousMachinesState]); // Theo dõi thay đổi của isSpeaking và previousMachinesState

  return (
    <div className="p-2" style={{ transform: 'scale(1, 0.93)', transformOrigin: 'top' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className={`rounded-lg shadow-lg p-0 flex flex-col items-start justify-between transition-all transform hover:scale-[102%] hover:shadow-2xl duration-200 ${machine.isConnect ? 'bg-[#0101dd] border-blue-900 text-white' : 'bg-gray-400 border-gray-600 text-gray-200'}`}
          >

            {/* Header */}
            <div className="w-full p-0 mb-2 bg-[#003263] text-white rounded-t-lg flex items-center">
              {/* ID with green background */}
              <div className="bg-[#027d02] text-[40px] font-semibold px-6 py-1 mr-4 rounded-tl-lg">
                {machine.id}
              </div>


              {/* Name with blue background */}
              <div className="flex-1 text-center text-[40px] font-semibold bg-[#003263] rounded-md">
                {machine.name}
              </div>
            </div>

            <div className="w-full p-2 bg-[#0101dd] text-white">
              <div className="grid grid-cols-2 text-center gap-y-10">
                {/* Daily Target */}
                <div className="flex flex-col justify-center items-center">
                  <div className="font-bold text-[13px]">MỤC TIÊU NGÀY</div>
                  <div className="text-xs">(DAILY TARGET)</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[38px] font-bold">{machine.dailyTarget}</div>
                </div>

                {/* Hourly Target */}
                <div className="flex flex-col justify-center items-center">
                  <div className="font-bold text-[13px]">MỤC TIÊU GIỜ</div>
                  <div className="text-xs">(HOURLY TARGET)</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[38px] font-bold">{machine.hourTarget}</div>
                </div>

                {/* Actual */}
                <div className="flex flex-col justify-center items-center">
                  <div className="font-bold text-[13px]">THỰC HIỆN</div>
                  <div className="text-xs">(ACTUAL)</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[38px] font-bold">{machine.actual}</div>
                </div>
              </div>
            </div>



            {/* Status Indicators */}
            <div className="w-full bg-[#033c8b] pt-3 pl-3 pr-3 rounded-b-lg ">
              <div className="flex justify-between mb-2">
                <div className="text-[18px] font-bold text-red-500">Hỏng Máy</div>
                <div className="flex space-x-2">
                  {Object.keys(machine.error).map((key) => (
                    <div
                      key={key}
                      className={`w-6 h-6 flex items-center justify-center rounded-lg font-semibold ${machine.error[parseInt(key)] ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                    >
                      {key}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <div className="text-[18px] font-bold text-yellow-500">Cần Hỗ Trợ</div>
                <div className="flex space-x-2">
                  {Object.keys(machine.support).map((key) => (
                    <div
                      key={key}
                      className={`w-6 h-6 flex items-center justify-center rounded-lg font-semibold ${machine.support[parseInt(key)] ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                    >
                      {key}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <div className="text-[18px] font-bold text-green-500">Hết Hàng</div>
                <div className="flex space-x-2">
                  {Object.keys(machine.outStock).map((key) => (
                    <div
                      key={key}
                      className={`w-6 h-6 flex items-center justify-center rounded-lg font-semibold ${machine.outStock[parseInt(key)] ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                    >
                      {key}
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
