# Nguyễn Hoàng Huy - Portfolio

> **Fullstack Developer & DevOps** · TP. Hồ Chí Minh  
> Sinh viên Software Engineering tại FPT University HCMC. Thực tập tại Amazing Tech.  
> 🌐 Website: [nguyenhoanghuy.io.vn](https://nguyenhoanghuy.io.vn)

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **CI/CD & Hosting:** GitHub Actions ➔ GitHub Pages

---

## 🚀 Hướng dẫn phát triển (Development)

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy môi trường development
```bash
npm run dev
```
Trình duyệt sẽ mở tại `http://localhost:5173`.

### 3. Build production
```bash
npm run build
```
Kết quả build được xuất ra thư mục `dist/`.

### 4. Preview bản build
```bash
npm run preview
```

---

## 📁 Cấu trúc thư mục (Project Structure)

```
Portfolio/
├── .github/workflows/deploy.yml # GitHub Actions tự động build & deploy
├── public/                      # Static assets (CNAME, CV docx/pdf, cv.html)
├── src/
│   ├── components/              # Các components giao diện
│   │   ├── Navbar.tsx           # Floating capsule navbar với tab dãn ngang
│   │   ├── Hero.tsx             # Hero section & Typewriter
│   │   ├── About.tsx            # Giới thiệu & thẻ thông tin
│   │   ├── Projects.tsx         # 5 dự án production & research
│   │   ├── Skills.tsx           # Kỹ năng theo từng nhóm
│   │   ├── Accomplishments.tsx  # Thành tích (đã comment, bật lại khi cần)
│   │   ├── Contact.tsx          # Liên hệ & copy email
│   │   └── ProgressBar.tsx      # Thanh tiến trình cuộn
│   ├── context/
│   │   ├── ThemeContext.tsx     # Quản lý giao diện Sáng / Tối (Dark mode)
│   │   └── LanguageContext.tsx  # Đa ngôn ngữ (VI / EN)
│   ├── data/
│   │   └── content.ts           # Dữ liệu nội dung song ngữ VI/EN
│   ├── hooks/                   # Custom React hooks (Typewriter, ScrollSpy)
│   ├── lib/utils.ts             # Helper clsx + twMerge
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                # Tailwind base & CSS variables
├── index.html                   # HTML template chính cho Vite
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 📬 Liên hệ

- **Email:** jayker03212k5@gmail.com
- **LinkedIn:** [Huy Nguyễn Hoàng](https://www.linkedin.com/in/huy-nguy%E1%BB%85n-ho%C3%A0ng-0569aa38a/)
- **GitHub:** [NguyenHoangHuy2103](https://github.com/NguyenHoangHuy2103)
