import Image from 'next/image';

export default function Header() {
    return (
        <header className="w-full h-[60px] bg-[#0000aa] text-white flex items-center px-5">
            {/* Tên "ABCXAA" ở giữa */}
            <div className="flex-grow text-center font-semibold text-[35px] text-[#1bfe05]">
                PHẦN MỀM QUẢN LÝ NĂNG SUẤT - NHÀ MÁY MAY KIM SƠN - NINH BÌNH
            </div>

            {/* Logo ở góc phải */}
            <div>
                <Image src="/vnatech.png" alt="Logo" width={48} height={48} className="h-12 w-auto" />
            </div>
        </header>
    );
}
