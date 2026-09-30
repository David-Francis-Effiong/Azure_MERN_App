# Azure MERN App Deployment

This is a checkpoint project for GoMyCode demonstrating how to deploy a MERN (MongoDB, Express, React, Node.js) stack application to Microsoft Azure.

## Project Structure

- `server.js`: The Express backend, configured to connect to MongoDB and serve the compiled React frontend.
- `client/`: The React frontend, generated using Vite.
- `.env`: Environment variables (create this based on your configuration).

## Local Development

1. Run backend: `npm start` (Make sure MongoDB is running or update `.env` with a valid `MONGODB_URI`).
2. Run frontend: `cd client && npm run dev`

## Deployment Instructions (Microsoft Azure)

### 1. Set Up MongoDB Atlas
Since Azure doesn't offer a native MongoDB service, you will need to use MongoDB Atlas.
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Create a new cluster (the free tier works well).
- Go to **Database Access** and create a new database user.
- Go to **Network Access** and allow access from anywhere (IP `0.0.0.0/0`) or add Azure's specific IPs.
- Click **Connect** on your cluster, choose "Connect your application", and copy the connection string.

### 2. Prepare the App for Deployment
The app is already configured to serve the React frontend from the Express backend and read `MONGODB_URI` from the environment variables.

### 3. Create an Azure Web App Service
- Log into the [Azure Portal](https://portal.azure.com).
- Click **Create a resource** > **Web App**.
- Fill in the details:
  - **Publish**: Code
  - **Runtime stack**: Node.js (choose the version that matches your local environment, e.g., Node 18 or 20).
  - **Operating System**: Linux is recommended for Node apps.
  - Choose an appropriate pricing tier (F1 Free tier is available).

### 4. Configure Environment Variables in Azure
- Once the Web App is created, go to the resource.
- On the left sidebar, under **Settings**, select **Environment variables** (or **Configuration**).
- Add the following application settings:
  - `MONGODB_URI`: The connection string from MongoDB Atlas.
  - `NODE_ENV`: `production`

### 5. Deployment Setup
- Go to **Deployment Center** under the Web App settings.
- Select your source (e.g., GitHub, Local Git).
  - If using **GitHub**: Authorize Azure to access your GitHub account, select your organization, repository (`Azure_MERN_App`), and branch. Azure will automatically generate a GitHub Actions workflow to build and deploy your app.
  - If using **Local Git**: Follow the instructions to add the Azure remote and push your code.

### Note on Build Process
If you use GitHub integration, Azure's Kudu engine or GitHub Actions will automatically run `npm install` and `npm start`. Ensure that you have built the React app (`cd client && npm install && npm run build`) and committed the `client/dist` folder to your repository, or add a post-install script in `package.json` to build the frontend on Azure.

## Testing Your App
Once deployment is complete, go to the **Overview** page of your Web App and click the **Default domain** URL. Your MERN application should be live!
