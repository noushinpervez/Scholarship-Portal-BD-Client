# Scholarship Portal BD

## Project Overview
**Scholarship Portal BD** is a Scholarship Management System designed to help students search for and apply to suitable universities and scholarships that best fit their needs. The users can manage their scholarship applications and reviews. The system includes features for students, moderators, and admins to ensure smooth operation and management of the scholarship process.

## Key Features
1. **User Roles Management:** Support for different user roles (students, moderators, admins) with dedicated dashboards and role-specific permissions.
2. **Comprehensive Scholarship Search:** Search and filter scholarships by university name, degree, and other criteria.
3. **Secure Application Process:** Ensures secure scholarship application submissions with integrated payment gateways and application management capabilities.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase (Email/Password, Google Login)
- **Payment Gateway:** Stripe
- **Hosting:** Netlify (Frontend), Vercel (Backend)

## Administrator Credentials
- **Email:** portal@gmail.com
- **Password:** 1234A@

## Live Site
[Visit Scholarship Portal BD](https://scholarship-portal-bd.netlify.app/)

## Server Repository
[Scholarship Portal BD Server Repository](https://github.com/noushinpervez/Scholarship-Portal-BD-Server)

## Local Setup Instructions
To run the project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/noushinpervez/Scholarship-Portal-BD-Client.git
    ```

2. **Navigate to the project directory and install dependencies:**
    ```sh
    cd Scholarship-Portal-BD-Client
    npm install
    ```

3. **Set up environment variables:**
   - Create a `.env` file in the client directory and add necessary configuration variables (Firebase config, Stripe keys, and Imgbb Image Hosting API keys):
   
   ```plaintext
   VITE_API_KEY=
   VITE_AUTH_DOMAIN=
   VITE_PROJECT_ID=
   VITE_STORAGE_BUCKET=
   VITE_MESSAGING_SENDER_ID=
   VITE_APP_ID=
   VITE_PAYMENT_GATEWAY_KEY=
   VITE_IMAGE_HOSTING_API=
   ```

   - Replace each variable (VITE_API_KEY, VITE_AUTH_DOMAIN, etc.) with your actual configuration keys and values **without quotations**.

4. **Run the client:**
    ```sh
    npm run dev
    ```

5. **Access the application:**
    The application will run on `http://localhost:5173`.

Follow these instructions to set up and locally run the client-side of Scholarship Portal BD to explore its features and functionalities.