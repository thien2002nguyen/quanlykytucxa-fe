# Sử dụng Node 22 Alpine nhẹ và bảo mật hơn
FROM node:22-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build NextJS
RUN npm run build

# Expose port
EXPOSE 3000

# Chạy ứng dụng ở môi trường production
CMD ["npm", "start"]
