// Hàm format giá tiền thành VND
export function formatVND(amount: number): string {
  return amount
    .toFixed(0) // Làm tròn số đến đơn vị (không có số thập phân)
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm vào mỗi 3 chữ số
}

// Hàm chuyển từ định dạng tiền tệ VND thành số
export function parseVND(vndString: string): number {
  // Loại bỏ tất cả ký tự không phải số và dấu chấm
  const cleanedString = vndString.replace(/[^\d]/g, "");

  // Chuyển chuỗi đã làm sạch thành số và trả về
  return parseInt(cleanedString, 10);
}
