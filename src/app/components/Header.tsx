// app/components/Header.tsx
export default function Header() {
    return (
        <header className="w-full h-[60px] bg-blue-600 text-white flex items-center px-5">
            {/* Tên "ABCXAA" ở giữa */}
            <div className="flex-grow text-center text-lg font-semibold text-[30px] text-green-400">
                PHẦN MỀM QUẢN LÝ NĂNG SUẤT - NHÀ MÁY MAY KIM SƠN - NINH BÌNH
            </div>

            {/* Logo ở góc phải */}
            <div >
                <img src="/vnatech.png" alt="Logo" className="h-12 w-auto" />
            </div>
        </header>
    );
}
