# Easter Healing Clinic

A professional medical clinic website built with TypeScript, Node.js, MongoDB, and React.

## Features

- Responsive design with Material-UI
- Professional blue theme
- Patient appointment scheduling
- Doctor profiles and availability
- User authentication and authorization
- Medical service listings
- Contact and about pages

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- Multer for file uploads

### Frontend
- React
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- Formik & Yup
- Axios

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd easter-healing-clinic
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Create a .env file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/easter_healing_clinic
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend application
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
easter-healing-clinic/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/         # Page components
│       ├── services/      # API services
│       ├── store/         # Redux store
│       └── types/         # TypeScript types
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   └── uploads/          # Uploaded files
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
