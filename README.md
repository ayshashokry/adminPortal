# Admin Portal – SalesFine

This is a Next.js project for the SalesFine Admin Portal, built with React and Tailwind CSS.

## 🚀 Getting Started (Development Mode)

To run the project locally:

1. Install dependencies  
npm install

2. Create a .env.local file in the root and add:  
NEXT_PUBLIC_API_BASE_URL=https://dev-api.salesfine.co/api/

3. Start the development server  
npm run dev

Visit: http://localhost:3000

## ⚙️ Available Scripts

npm run dev     → Run in development mode  
npm run build   → Build the app for production  
npm run start   → Start the app in production mode  
npm run lint    → Run ESLint to check code quality  

## 🐳 Docker Deployment (Production)

1. Build the Docker image  
docker build -t admin-portal-ui --build-arg NEXT_PUBLIC_API_BASE_URL=https://dev-api.salesfine.co/api/ .

2. Run the container  
docker run -p 3000:3000 admin-portal-ui

The app will be running on: http://localhost:3000

## 🌐 Environment Variables

NEXT_PUBLIC_API_BASE_URL → Base URL for the backend API used by the frontend

## 📁 Project Structure

/app            → App Router pages  
/components     → Reusable UI components  
/hooks          → Custom React hooks  
/utils          → Helper functions  
/public         → Static files (e.g. images)  

## 📚 Learn More

Next.js Documentation: https://nextjs.org/docs  
Tailwind CSS Docs: https://tailwindcss.com/docs  
React Documentation: https://reactjs.org  

## 🛠 Built With

- Next.js  
- React  
- Tailwind CSS  

## 🔒 License

This project is private and intended for internal SalesFine use only.
