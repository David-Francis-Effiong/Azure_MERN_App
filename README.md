# Azure MERN App Deployment

This is a checkpoint project for GoMyCode demonstrating how to deploy a MERN (MongoDB, Express, React, Node.js) stack application to Microsoft Azure.

## Live Demo

**[Link to Live Azure App](https://webmernapp-server.azurewebsites.net)** *(Replace this with your actual Azure Web App URL once deployed)*

## Project Structure

- `server.js`: The Express backend, configured to connect to MongoDB and serve the compiled React frontend.
- `client/`: The React frontend, generated using Vite.
- `.env`: Environment variables (create this based on your configuration).

## Local Development

1. Run backend: `npm start` (Make sure MongoDB is running or update `.env` with a valid `MONGODB_URI`).
2. Run frontend: `cd client && npm run dev`

## Deployment Instructions (Microsoft Azure)

### 1. Set Up Database (Azure Cosmos DB or MongoDB Atlas)
You can use **Azure Cosmos DB** (which has a MongoDB API) or **MongoDB Atlas**.

**Option A: Using Azure Cosmos DB (Recommended for Azure ecosystem)**
- Azure Cosmos DB provides a MongoDB-compatible API.
- In the Azure Portal, create an "Azure Cosmos DB for MongoDB" resource.
- Once created, go to **Connection String** to get your Primary Connection String.
- Note: The endpoint URLs (like `https://<name>.mongo.cosmos.azure.com/`) are **private database endpoints**. They should **never** be made public or placed directly in your front-facing documentation. Instead, they form part of your `MONGODB_URI` connection string (e.g., `mongodb://<username>:<password>@<name>.mongo.cosmos.azure.com:10255/?ssl=true...`) which stays securely inside your Azure Configuration.

**Option B: Using MongoDB Atlas**
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

---

## How to View This Project

### 1. Viewing Locally
To view the project on your own machine:
1. Open a terminal and navigate to the project directory: `cd I:\TECH\GoMyCode\Azure_MERN`
2. Start the server (which will also serve the frontend): `npm start`
3. Open your web browser and go to `http://localhost:5000`

### 2. Viewing Live on Azure
To view the deployed project on Azure:
1. Go to your Azure Portal.
2. Navigate to your **App Service** (Web App).
3. On the **Overview** page, look for the **Default domain** URL (it usually looks like `https://<your-app-name>.azurewebsites.net`).
4. Click that link to see your live MERN application!

---

## Important Security Note: Azure Cosmos DB URLs

If you are using Azure Cosmos DB, you might come across URLs like:
- `https://webmernapp-server.documents.azure.com/`
- `https://webmernapp-server.mongo.cosmos.azure.com/`

**What do they mean?**
These are your private database endpoints provided by Azure Cosmos DB's MongoDB API. They act exactly like a MongoDB Atlas cluster, allowing your Express backend to read and write data.

**Why shouldn't they be public?**
These URLs are strict backend connections. Making them public in your code or documentation is a major security risk. If a malicious user discovers your database URL, they could potentially access, steal, or delete your user data.

**How to use them properly:**
You should keep these URLs securely inside a full Connection String (which includes a secure password) and place them inside the **Environment variables** section of your Azure Web App settings under the variable name `MONGODB_URI`. Never hardcode them into your public GitHub files or documentation.
