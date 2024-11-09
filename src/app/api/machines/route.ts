import { NextResponse } from 'next/server';

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
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Danh sách máy cố định với `id` và `name` (tăng lên 15 máy)
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
    { id: 10, name: "LINE 10" },
    { id: 11, name: "LINE 11" },
    { id: 12, name: "LINE 12" },
    { id: 13, name: "LINE 13" },
    { id: 14, name: "LINE 14" },
    { id: 15, name: "LINE 15" }  // Thêm máy mới ở đây
];

// Biến lưu trữ dữ liệu máy
let machineData: Machine[] = [];

// Hàm tạo dữ liệu cho mỗi máy với các giá trị ngẫu nhiên
const generateMachineData = (): Machine[] => {
    return machineTemplates.map((template) => ({
        ...template,
        dailyTarget: getRandomInt(80, 150),
        hourTarget: getRandomInt(8, 15),
        actual: getRandomInt(0, 150),
        error: { 1: false, 2: false, 3: false, 4: false },
        support: { 1: false, 2: false, 3: false, 4: false },
        outStock: { 1: false, 2: false, 3: false, 4: false },
        isConnect: true
    }));
};

// Hàm cập nhật ngẫu nhiên các giá trị của `dailyTarget`, `hourTarget`, và `actual` mỗi giây
const updateTargetValues = () => {
    machineData.forEach((machine) => {
        machine.dailyTarget = getRandomInt(80, 150);
        machine.hourTarget = getRandomInt(8, 15);
        machine.actual = getRandomInt(0, 150);
    });
};

const updateStatus = () => {
    const randomMachineIndex = getRandomInt(0, machineData.length - 1);
    const randomMachine = machineData[randomMachineIndex];
    const statusTypes = ["error", "support", "outStock"] as const;
    const randomStatusType = statusTypes[getRandomInt(0, statusTypes.length - 1)]; // Chọn ngẫu nhiên giữa error, support, và outStock

    // Kiểm tra và thay đổi giá trị cho từng loại trạng thái
    if (randomStatusType === "error" || randomStatusType === "support" || randomStatusType === "outStock") {
        const statusKeys = Object.keys(randomMachine[randomStatusType]).map(Number);
        const randomKey = statusKeys[getRandomInt(0, statusKeys.length - 1)];

        // Đảo ngược giá trị của thuộc tính được chọn
        randomMachine[randomStatusType][randomKey] = !randomMachine[randomStatusType][randomKey];
    }
};

// Khởi tạo dữ liệu máy ban đầu
machineData = generateMachineData();

// Cập nhật `dailyTarget`, `hourTarget`, và `actual` mỗi giây
setInterval(updateTargetValues, 500);

// Cập nhật ngẫu nhiên trạng thái `error`, `support`, hoặc `outStock` mỗi 5 giây
setInterval(updateStatus, 10000);

// API Handler
export async function GET() {
    return NextResponse.json(machineData);
}
