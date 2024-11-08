'use client';  // Đánh dấu đây là Client Component

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Import Header component
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';  // Import các icon mũi tên
import './globals.css';  // Nhập vào file CSS

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
      <body className="min-h-screen overflow-hidden">
        <div className="flex flex-col min-h-screen">
          {/* Gọi Header component */}
          <Header />

          {/* Nút để điều khiển Sidebar */}
          <button
            onClick={toggleSidebar}
            className="fixed top-5 left-5 bg-blue-500 text-white p-2 rounded-md z-10 flex items-center"
          >
            {/* Hiển thị mũi tên tùy vào trạng thái sidebar */}
            {sidebarOpen ? (
              <FaArrowLeft />
            ) : (
              <FaArrowRight />
            )}
          </button>

          {/* Main content area */}
          <div className={`flex flex-1 overflow-hidden transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} />

            {/* Nội dung chính */}
            <main className="flex-1 p-0 bg-white overflow-y-auto transition-all">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
