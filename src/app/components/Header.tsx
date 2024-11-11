import Image from 'next/image';

export default function Header() {
    return (
        <header className="w-full h-[60px] bg-[#0000aa] text-white flex items-center px-4">
            {/* Tên "ABCXAA" ở giữa với khoảng cách lề trái 60px */}
            <div className="flex-grow font-semibold text-[32px] text-[#1bfe05] ml-[190px]">
                PHẦN MỀM QUẢN LÝ NĂNG SUẤT - NHÀ MÁY MAY KIM SƠN - NINH BÌNH
            </div>

            {/* Logo ở góc phải */}
            <div>
                <Image src="/vnatech.png" alt="Logo" width={48} height={48} className="h-12 w-auto" />
            </div>
        </header>
    );
}
