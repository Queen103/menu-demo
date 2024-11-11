'use client';  // Đánh dấu đây là Client Component

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Import Header component
import './globals.css';  // Nhập vào file CSS
import Footer from './components/Footer'; // Import Footer component
import { IoMenuOutline } from "react-icons/io5";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);  // Quản lý trạng thái của Sidebar

  // Hàm để toggle trạng thái của sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <div className="flex flex-col flex-1 pb-[25px]">
          {/* Gọi Header component */}
          <Header />

          {/* Nút để điều khiển Sidebar */}
          <button
            onClick={toggleSidebar}
            className="fixed top-0.75 left-5 text-white rounded-md z-10 flex items-center bg-transparent"
          >
            {/* Hiển thị mũi tên tùy vào trạng thái sidebar */}
            {sidebarOpen ? (
              <IoMenuOutline className='text-[60px] ml-[50px]' />
            ) : (
              <IoMenuOutline className='text-[60px] ' />
            )}
          </button>

          {/* Main content area */}
          <div className={`flex flex-1 overflow-hidden transition-all ${sidebarOpen ? 'ml-[190px]' : 'ml-0'}`}>
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} />

            {/* Nội dung chính */}
            <main className="flex-1 p-0 bg-white overflow-y-auto transition-all">
              {children}
            </main>
          </div>
        </div>

        {/* Footer bám dính dưới cùng */}
        <Footer />
      </body>
    </html>
  );
}
