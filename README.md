# VacayGen

> **Smart vacation message generator for professionals**

VacayGen is a privacy-first web application that helps professionals create personalized, professional vacation messages in seconds. Generate contextual out-of-office messages with multiple styles and languages - all processed locally in your browser.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

![Image](https://i.imgur.com/OHT2Py3.jpeg)

## ✨ Features

- **🎯 Smart Message Generation**: Context-aware vacation messages tailored to your situation
- **🎨 Multiple Styles**: Professional, casual, creative, and humorous message variants
- **🌍 Multilingual Support**: Generate messages in French and English
- **🔒 Privacy-First**: All processing happens locally - no data leaves your browser
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **♿ Accessible**: WCAG compliant with full keyboard navigation and screen reader support
- **⚡ Rate Limiting**: Built-in protection against abuse

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vacaygen.git
   cd vacaygen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Internationalization**: Custom translation system
- **Animations**: CSS animations + confetti effects
- **Form Handling**: Custom validation hooks

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── vacation/        # Vacation-specific components
│   └── ...              # Other components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
└── types/               # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

This application runs entirely client-side and doesn't require environment variables.

### Customization

- **Themes**: Edit `src/index.css` and `tailwind.config.ts`
- **Languages**: Add translations in `src/hooks/useTranslation.tsx`
- **Message Templates**: Modify `src/lib/messageTemplates.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Ensure accessibility compliance
- Add translations for new text content
- Test on multiple devices and browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Privacy & Security

- **No Data Collection**: VacayGen doesn't collect, store, or transmit personal data
- **Local Processing**: All message generation happens in your browser
- **GDPR Compliant**: Fully compliant with privacy regulations
- **Security Features**: Rate limiting, input validation, and XSS protection

## 📧 Support

For support, please open an issue on GitHub

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Made by [Hugo Mourlevat](https://xn--pn8htg0i.to/) with ❤️ for busy professionals who need perfect vacation messages**
