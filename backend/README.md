# 🏨 Booktel - Hotel Booking Management System

A modern, scalable, and role-based hotel booking management system built with a clean architecture and production-grade practices. It allows customers to book hotels, hotel managers to manage room listings, and admins to oversee the platform.

---

## 🌐 Live Demo

- **Backend API**: [booktel-server.onrender.com](https://booktel-server.onrender.com)
- **Frontend**: [booktel-p15.vercel.app](https://booktel-p15.vercel.app) | [frontend-code](https://github.com/modasser-nayem/booktel-p15/tree/main/frontend)

---

## 📑 Table of Contents

- [Documentation](#documentation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Roles & Permissions](#roles--permissions)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)
- [Author](#author)

---

## 📄 Documentation

- **[📘 BRD - Business Requirements Document](https://docs.google.com/document/d/1apyQe21Q8inLPXYpuN9Covh_JTUSNeQ-VDHeQLpVxSw/edit?usp=sharing)**
- **[📙 SRS - Software Requirements Specification](https://docs.google.com/document/d/1-yuJ1Qc3p2Of8zSP5GdJWv86nAu6DOf7x9ZIKbmoRJo/edit?usp=sharing)**
- **[📬 API - Postman endpoints documentation](https://documenter.getpostman.com/view/22696421/2sB2x8EWET)**

---

## 🚀 Features

- 🧾 **User Authentication & Authorization (JWT)**
- 🏨 **Hotel & Room Management** by Hotel Owners
- 🔍 **Hotel Search with Filters** (location, price, rating, amenities)
- 📆 **Date-based Room Booking** with availability logic
- 💳 **Stripe Payment Gateway Integration**
- 📨 **Email Notifications** for Account creation, bookings and cancellations
- ⭐ **Review & Rating System**
- 📊 **Admin Dashboard APIs** for analytics and control
- 🐳 **Dockerized for Deployment**
- 🧪 **Unit & Integration Testing with Jest & supertest**
- 🔐 **Secure Password Hashing, Rate Limiting & Error Handling**

---

## 🛠️ Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Language         | TypeScript             |
| Frameworks       | Node.js, Express.js    |
| Databases        | PostgreSQL             |
| Auth             | JWT, Bcrypt            |
| ORM              | Prisma                 |
| Validation       | Zod                    |
| CI/CD            | GitHub Actions         |
| Containerization | Docker, Docker Compose |
| Documentation    | Postman                |
| Notification     | Nodemailer             |
| Payment          | Stripe Integration     |
| Testing          | Jest, Supertest        |

---

<p align="right"><a href="#readme-top">back to top</a></p>

## 🧱 Architecture Overview

The backend follows a layered, modular architecture with:

- **Clean code structure**
- **Separation of concerns**
- **Zod-based DTO validation**
- **Role-based middleware**
- **Global error handling**
- **Logger (Winston)**

---

## 👥 Roles & Permissions

| Role       | Capabilities                                               |
| ---------- | ---------------------------------------------------------- |
| Admin      | Manage users, approve/reject hotels, access all data       |
| HotelOwner | Register/manage hotels & rooms, view bookings              |
| Customer   | Book and cancel rooms, write reviews, manage their profile |

---

## 📬 API Endpoints

> Base URL: `https://booktel-server.onrender.com/api/v1`

- **API Documentation (postman)**: [https://documenter.getpostman.com/view/22696421/2sB2x8EWET](https://documenter.getpostman.com/view/22696421/2sB2x8EWET)

---

<p align="right"><a href="#readme-top">back to top</a></p>

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/modasser-nayem/booktel-p15.git

cd booktel-p15

cd backend

yarn install

cp .env.example .env

yarn prisma migrate deploy

yarn prisma generate

yarn dev # Make sure PostgreSQL are running. And also add all .env variable
```

---

## 🧪 Scripts

```bash
# Run in development mode
yarn dev


# Run tests
yarn test

# Build for production
yarn build

# Run in production mode
yarn start

# Format code
yarn format

# Lint code
yarn lint
```

---

## 📦 Deployment

Server hosted on Render

CI/CD managed via GitHub Actions

Dockerized infrastructure with support for docker-compose

---

## 🪪 License

This project is licensed under the MIT License.

---

## 📣 Author

#### Ali Modasser Nayem

🔗 [Portfolio](https://alimodassernayem.vercel.app/) | [GitHub](https://github.com/modasser-nayem) | [LinkedIn](https://www.linkedin.com/in/alimodassernayem/)

Email: [modassernayem@gmail.com](modassernayem@gmail.com)

---

<p align="right"><a href="#readme-top">back to top</a></p>
