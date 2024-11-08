// app/api/machines/route.ts

import { NextResponse } from 'next/server'

// Định nghĩa kiểu cho dữ liệu máy
interface Machine {
    id: number;
    name: string;
    dailyTarget: number;
    hourTarget: number;
    actual: number;
    error: {
        [key: number]: boolean;
    };
    support: {
        [key: number]: boolean;
    };
    outStock: {
        [key: number]: boolean;
    };
    isConnect: boolean;
}

// Hàm tạo dữ liệu ngẫu nhiên cho các thuộc tính boolean và số
const getRandomBoolean = () => Math.random() >= 0.5;
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Danh sách máy cố định với `id` và `name`
const machineTemplates: Pick<Machine, 'id' | 'name'>[] = [
    { id: 1, name: "LINE 1" },
    { id: 2, name: "LINE 2" },
    { id: 3, name: "LINE 3" },
    { id: 4, name: "LINE 4" },
    { id: 5, name: "LINE 5" },
    { id: 6, name: "LINE 6" },
    { id: 7, name: "LINE 7" },
    { id: 8, name: "LINE 8" },
    { id: 9, name: "LINE 9" },
    { id: 10, name: "LINE 10" }
];

// Hàm tạo dữ liệu cho mỗi máy với các giá trị ngẫu nhiên
const generateMachineData = (): Machine[] => {
    return machineTemplates.map((template) => ({
        ...template,
        dailyTarget: getRandomInt(80, 150),
        hourTarget: getRandomInt(8, 15),
        actual: getRandomInt(0, 150),
        error: { 1: false, 2: false, 3: true, 4: false },
        support: { 1: false, 2: false, 3: false, 4: false },
        outStock: { 1: false, 2: false, 3: false, 4: false },
        isConnect: true
    }));
};

// API Handler
export async function GET() {
    // Tạo dữ liệu ngẫu nhiên và trả về dưới dạng JSON
    const data = generateMachineData();
    return NextResponse.json(data);
}
