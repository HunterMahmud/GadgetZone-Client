# GadgetZone

**GadgetZone** is a user-friendly online electronics gadget shop designed to help users find his desire product based on various types of filter.

**Visit the live site:** [GadgetZone](https://gadgetzone-1.web.app/).

[Server Side Repository](https://github.com/HunterMahmud/GadgetZone-Server)

## Features:

- **Home Page**: Provides a huge product list where user can see the product and search based on his requirement.]

- **Filter Options**: Website product page provides a lots of filter options such as filter by Brand names, category, and price ranges.

- **Sort Options**: Product page also provides various types of sorting options such as short by price: Low to High, High to Low, and sort by release date.

- **Login and Registration**: Website provide a secure login and registration system and login with social accound such as goole popup login or Email, Password login.

- **Protected Routes**: The website uses protected routes to ensure that users can only access pages appropriate to their login status, preventing unauthorized access of the website.

- **Responsive Design**: The website is fully responsive, providing a seamless user experience across desktops, tablets, and mobile phones.

This project is a client-side application for GadgetZone, built with React and Vite. It includes various dependencies for smooth development and deployment.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/download/) (which includes npm).
- You have a Firebase project set up (for integrating Firebase services).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HunterMahmud/GadgetZone-Client.git
   cd gadgetzone-client
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of your project and add your Firebase configuration keys. This file should include at least the following:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

   Replace `your_api_key`, `your_auth_domain`, etc., with your actual Firebase project configuration values.

## Usage

### Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server and you can view the application in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create an optimized build in the `dist` folder.

### Previewing the Production Build

To preview the production build, run:

```bash
npm run preview
```

This will start a local server to preview the production build.

### Linting

To lint the project files, run:

```bash
npm run lint
```

This will run ESLint and check for any linting errors based on the configurations provided.

### Environment Variables

Make sure to keep your `.env.local` file secure and do not commit it to version control. Use `.gitignore` to exclude it from your repository:

```plaintext
.env.local
```

## Contributing

If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

### Notes:

- Replace `"https://github.com/HunterMahmud/GadgetZone-Client.git"` with the actual URL of your repository.
- The `.env.local` file should be included in your `.gitignore` to prevent it from being committed to the repository.
- Ensure your Firebase configuration values are correctly set in the `.env.local` file.
- Adjust any additional instructions or configurations specific to your project.
