'use client';  // Đánh dấu đây là Client Component

import { usePathname } from 'next/navigation';  // Hook để lấy đường dẫn hiện tại
import Link from 'next/link';
import { FaHome, FaCog, FaUser, FaInfoCircle, FaPhone } from 'react-icons/fa';

interface SidebarProps {
    isOpen: boolean;  // Thêm prop để kiểm soát việc hiển thị
}

const Sidebar = ({ isOpen }: SidebarProps) => {
    const pathname = usePathname();  // Lấy đường dẫn hiện tại

    return (
        <div className={`w-64 bg-[#00006e] pt-[80px] text-white h-screen p-0 flex flex-col fixed top-0 left-0 transition-all ${isOpen ? 'transform-none' : '-translate-x-full'}`}>
            <ul className="list-none space-y-0">
                <li className="flex items-center w-full">
                    <Link
                        href="/"
                        className={`flex items-center space-x-3 text-white text-lg px-3 py-4 w-full ${pathname === '/' ? 'bg-[#0000aa]' : 'hover:bg-[#0000aa]'}`}
                    >
                        <FaHome className="text-xl" />
                        <span>Giao diện chính</span>
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link
                        href="/detail"
                        className={`flex items-center space-x-3 text-white text-lg px-3 py-4 w-full ${pathname === '/detail' ? 'bg-[#0000aa]' : 'hover:bg-[#0000aa]'}`}
                    >
                        <FaInfoCircle className="text-xl" />
                        <span>Giao diện chi tiết</span>
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link
                        href="/settings"
                        className={`flex items-center space-x-3 text-white text-lg px-3 py-4 w-full ${pathname === '/settings' ? 'bg-[#0000aa]' : 'hover:bg-[#0000aa]'}`}
                    >
                        <FaCog className="text-xl" />
                        <span>Cài đặt chung</span>
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link
                        href="/account"
                        className={`flex items-center space-x-3 text-white text-lg px-3 py-4 w-full ${pathname === '/account' ? 'bg-[#0000aa]' : 'hover:bg-[#0000aa]'}`}
                    >
                        <FaUser className="text-xl" />
                        <span>Tài khoản</span>
                    </Link>
                </li>
                <li className="flex items-center w-full">
                    <Link
                        href="/contact"
                        className={`flex items-center space-x-3 text-white text-lg px-3 py-2 w-full ${pathname === '/contact' ? 'bg-[#0000aa]' : 'hover:bg-[#0000aa]'}`}
                    >
                        <FaPhone className="text-xl" />
                        <span>Liên hệ</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
