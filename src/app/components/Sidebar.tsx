'use client';  // Đánh dấu đây là Client Component

import Link from 'next/link';
import { FaHome, FaCog, FaUser, FaInfoCircle, FaPhone } from 'react-icons/fa';

interface SidebarProps {
    isOpen: boolean;  // Thêm prop để kiểm soát việc hiển thị
}

const Sidebar = ({ isOpen }: SidebarProps) => {
    return (
        <div className={`w-64 bg-blue-800 text-white h-screen p-5 flex flex-col fixed top-0 left-0 transition-all ${isOpen ? 'transform-none' : '-translate-x-full'}`}>
            <ul className="list-none space-y-5">
                <li className="flex items-center">
                    <Link href="/" className="flex items-center space-x-3 hover:text-black mt-16 text-white text-lg hover:bg-blue-300 px-3 py-2 rounded-md">
                        <FaHome className="text-xl" />
                        <span>Giao diện chính</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <Link href="/detail" className="flex items-center space-x-3 hover:text-black text-white text-lg hover:bg-blue-300 px-3 py-2 rounded-md">
                        <FaInfoCircle className="text-xl" />
                        <span>Giao diện chi tiết</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <Link href="/settings" className="flex items-center space-x-3 hover:text-black text-white text-lg hover:bg-blue-300 px-3 py-2 rounded-md">
                        <FaCog className="text-xl" />
                        <span>Cài đặt chung</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <Link href="/account" className="flex items-center space-x-3 hover:text-black text-white text-lg hover:bg-blue-300 px-3 py-2 rounded-md">
                        <FaUser className="text-xl" />
                        <span>Tài khoản</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <Link href="/contact" className="flex items-center space-x-3 hover:text-black text-white text-lg hover:bg-blue-300 px-3 py-2 rounded-md">
                        <FaPhone className="text-xl" />
                        <span>Liên hệ</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
