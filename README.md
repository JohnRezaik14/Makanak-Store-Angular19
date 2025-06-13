# Makanak E-Commerce Platform

A modern e-commerce platform built with Angular that provides a seamless shopping experience.

## Demo

Watch a video demonstration of Makanak E-commerce Platform:

## 🎥 Demo

[![Watch the video](https://drive.google.com/uc?export=view&id=1HdZ6c-_MuL-VjQqn8-DGQrkd6ZtJ77Tl)](https://drive.google.com/file/d/1CT2TZWYS5ZVMxGNzewiJqi72tsmGRFvr/view?usp=sharing)

## Features

- **User Authentication**

  - Email/Password login
  - User registration with profile details
  - Protected routes for authenticated users

- **Product Management**

  - Product listing with search functionality
  - Detailed product pages
  - Product categorization
  - Price and discount display

- **Shopping Cart**

  - Add/Remove products
  - Adjust quantities
  - Persistent cart storage
  - Real-time total calculation

- **Order Management**

  - Order creation and tracking
  - Order history
  - Order status monitoring

- **User Profile**
  - Personal information 
  - Order history viewing
  - Shipping address 

## Technical Features

- Angular 19 Components
- PrimeNG UI Components
- Tailwind CSS for styling
- Signal-based State Management
- Responsive Design
- Form Validation
- Route Protection with Guards

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/makanak-front.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Start the mock backend:

   ```bash
   json-server --watch db.json
   ```

## Development Stack

- Angular 19
- PrimeNG
- Tailwind CSS
- JSON Server (Mock Backend)
- TypeScript
- RxJS

## Project Structure

```
src/
├── app/
│   ├── core/               # Core modules, services, guards
│   ├── features/          # Feature modules (products, cart, etc.)
│   └── shared/            # Shared components, utilities
├── assets/
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
