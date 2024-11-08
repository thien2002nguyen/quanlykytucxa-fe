export const isContentValid = (content: string): boolean => {
  // Loại bỏ tất cả thẻ HTML và kiểm tra nếu còn lại nội dung thực tế
  const strippedContent = content
    .replace(/<[^>]+>/g, "") // Loại bỏ tất cả thẻ HTML
    .trim(); // Loại bỏ khoảng trắng thừa

  // Nếu còn lại nội dung văn bản, trả về true, ngược lại false
  return strippedContent.length > 0;
};
