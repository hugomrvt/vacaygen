# Away

> **Brutalist Out-of-Office Message Generator**

Away is a **privacy-first, no-BS** web application that helps professionals create **bold, personalized out-of-office messages** in seconds. Generate **8 unique styles** of absence messages in French and English—**100% locally in your browser**, with **zero tracking, zero AI slop**.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

![Away - Brutalist Design](https://i.imgur.com/OHT2Py3.jpeg)

## ✨ Features

- **🎯 Bold Message Generation**: **8 unique styles** for every personality (Professional, Millennial Pro, Gen-Z, Creative, Friendly, Minimalist)
- **🎨 Brutalist UI**: High-contrast, geometric, **no AI-generated slop**—just clean, intentional design
- **🌍 Multilingual**: French and English (more coming soon)
- **🔒 100% Local**: **No data leaves your browser**—no tracking, no servers, no BS
- **📱 Responsive**: Works on desktop, tablet, and mobile
- **♿ Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **⚡ Rate Limiting**: Protection against abuse
- **💾 Custom Templates**: Save and reuse your favorite message styles
- **📧 Email Integration**: One-click copy to your email client
- **📜 History**: Access your previously generated messages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hugomrvt/away.git
   cd away
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
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
- **Styling**: Tailwind CSS + **Custom Brutalist Components** (no shadcn/ui)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Hooks + Context API
- **Internationalization**: Custom translation system (FR/EN)
- **Animations**: CSS animations + Framer Motion (for micro-interactions)
- **Form Handling**: React Hook Form + Custom validation
- **Storage**: localStorage (for templates & history)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components (Brutalist Design)
│   ├── ui/              # Custom brutalist components (Button, Card, Input...)
│   ├── message/         # Message-specific components (MessageDisplay, StyleSelector)
│   └── layout/          # Layout components (Header, Footer, StepIndicator)
├── hooks/               # Custom React hooks
│   ├── useMessageGenerator.tsx  # Message generation logic
│   ├── useVacationForm.tsx      # Form state & validation
│   ├── useTemplates.tsx          # Custom templates management
│   ├── useHistory.tsx            # Message history (localStorage)
│   └── useTranslation.tsx       # i18n (FR/EN)
├── lib/                 # Utility functions
│   ├── messageTemplates.ts      # 8 message styles + variations
│   ├── dateUtils.ts             # Date formatting
│   ├── securityUtils.ts         # XSS protection, validation
│   └── emailUtils.ts            # Email integration helpers
├── pages/               # Page components
│   ├── Index.tsx                # Main page (multi-step form)
│   ├── Templates.tsx            # Custom templates manager
│   ├── History.tsx              # Message history page
│   └── NotFound.tsx             # 404 page
├── types/               # TypeScript type definitions
│   ├── index.ts                 # Global types (VacationData, MessageTemplate...)
│   └── components.ts            # Component props types
└── styles/              # Global styles & Tailwind config
    ├── globals.css              # Custom CSS (animations, brutalist theme)
    └── tailwind.config.ts        # Tailwind configuration (brutalist palette)
```

## 🔧 Configuration

### Environment Variables

This application runs **100% client-side** and doesn't require environment variables or backend services.

### Customization

- **Themes**: Edit `src/styles/globals.css` and `tailwind.config.ts` (Brutalist palette: Orange `#FF4500`, Blue `#0066FF`)
- **Languages**: Add translations in `src/hooks/useTranslation.tsx`
- **Message Templates**: Modify `src/lib/messageTemplates.ts` (8 styles × 2 languages)
- **Custom Templates**: Users can save their own templates via the **Templates** page

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

- **🔒 No Data Collection**: Away **never** collects, stores, or transmits personal data
- **💻 100% Local Processing**: All message generation happens **exclusively in your browser**
- **🌍 GDPR Compliant**: Fully compliant with privacy regulations (no tracking, no cookies)
- **🛡️ Security Features**:
  - Rate limiting (20 requests/5min)
  - Input validation (XSS protection)
  - DOMPurify for HTML sanitization
  - LocalStorage encryption (for templates & history)
- **🚫 No AI Slop**: **Zero AI-generated content**—all templates are handcrafted

## 📧 Support

For support, please open an issue on GitHub

## 🙏 Acknowledgments

- Icons from [Lucide React](https://lucide.dev/)
- Animations inspired by [Framer Motion](https://www.framer.com/motion/)
- Brutalist design philosophy from [Brutalist Websites](https://brutalistwebsites.com/)

---

**Made by [Hugo Mourlevat](https://xn--pn8htg0i.to/) with ❤️ for professionals who want **bold, no-BS out-of-office messages**.**

**Away — Because your absence deserves a statement.**
