# Booktel - Hotel Booking Platform

A modern, responsive hotel booking platform built with Next.js, TypeScript, and Tailwind CSS. This application provides a complete solution for hotel management, booking, and user administration.

## 🚀 Features

### For Customers
- **Hotel Browsing**: Search and filter hotels by location, price, and rating
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Booking Management**: View and manage personal bookings
- **User Dashboard**: Personalized dashboard with booking history and recommendations
- **Secure Authentication**: Safe login and registration system

### For Hotel Owners
- **Hotel Management**: Add, edit, and manage hotel listings
- **Room Management**: Create and manage different room types
- **Booking Overview**: Monitor hotel bookings and revenue
- **Analytics Dashboard**: Performance metrics and insights
- **Status Management**: Track hotel approval status

### For Administrators
- **User Management**: Manage all user accounts and roles
- **Hotel Approval**: Review and approve hotel listings
- **System Analytics**: Platform-wide statistics and insights
- **Booking Monitoring**: Oversee all booking activities
- **Revenue Tracking**: Monitor platform revenue

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **UI Components**: Custom component library with Radix UI primitives

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (public)/          # Public routes (login, signup)
│   │   ├── dashboard/         # Protected dashboard routes
│   │   │   ├── admin/         # Admin dashboard pages
│   │   │   ├── customer/      # Customer dashboard pages
│   │   │   └── hotel-owner/   # Hotel owner dashboard pages
│   │   ├── hotels/            # Hotel browsing pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   └── layout/           # Layout components
│   ├── context/              # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   ├── services/             # API service layer
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── public/                   # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Mobile-first design with hamburger menu

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#ca8a04)
- **Error**: Red (#dc2626)
- **Neutral**: Gray scale

### Typography
- **Font**: Geist Sans (system font fallback)
- **Weights**: 100-900
- **Responsive**: Scales appropriately across devices

### Components
- **Cards**: Consistent elevation and spacing
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Accessible form controls with validation
- **Navigation**: Responsive navigation with mobile support

## 🔐 Authentication & Authorization

### User Roles
1. **Customer**: Can browse hotels and make bookings
2. **Hotel Owner**: Can manage hotels and view bookings
3. **Admin**: Full system access and management

### Security Features
- JWT-based authentication
- Role-based access control
- Protected routes
- Form validation
- CSRF protection

## 📊 API Integration

The application integrates with a RESTful API for:
- User authentication and management
- Hotel CRUD operations
- Booking management
- Payment processing
- Review system

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Build for production
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for performance
- **Bundle Size**: Optimized with tree shaking
- **Image Optimization**: Next.js Image component
- **Caching**: Strategic caching implementation

## 🔧 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update CSS variables in `globals.css`
- Customize component variants

### Components
- Extend UI components in `src/components/ui/`
- Create new layout components in `src/components/layout/`
- Add custom hooks in `src/hooks/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete hotel booking functionality
- Responsive design implementation
- Role-based access control
- Admin dashboard
- Customer booking system
- Hotel owner management tools

---

Built with ❤️ using Next.js and TypeScript
