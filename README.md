# AI News Next.js App

## Introduction

This project is an AI-powered news application built with Next.js. It fetches and displays the latest news articles using AI algorithms to curate content.

[To Table of Contents](#table-of-contents)

## Table of Contents

- [Introduction](#introduction)
- [What AI NEWS APP does](#what-ai-news-app-does)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Method 1: Local Installation](#method-1-plain-install-in-our-local-machine)
    - [Method 2: Docker](#method-2-use-docker)
- [Supabase](#supabase)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Project Features](#project-features)
- [Technologies Used](#technologies-used)
- [Authorization/Authentication](#authorizationauthentification)
  - [Overview](#overview)
  - [When and Why We Use supabase-auth or Supabase](#when-and-why-we-use-supabase-auth-or-supabase)
  - [Different Actions](#different-actions)
- [Caching Methods](#caching-methods)
  - [Summary](#summary)
  - [Issues and Resolutions](#issues-and-resolutions)
  - [Example Implementations](#example-implementations)
- [CI/CD Pipeline](#cicd-pipeline)
  - [Workflow Configuration](#workflow-configuration)
  - [Environment Variables](#environment-variables)
  - [Running the Pipeline](#running-the-pipeline)
- [Linting and Formatting](#linting-and-formatting)
- [Project Structure](#project-structure)
- [Continuous Deployment with Vercel](#continuous-deployment-with-vercel)
  - [Environments](#environments)
  - [Prerequisites](#prerequisites-1)
  - [Environment Variables](#environment-variables-1)
  - [GitHub Actions Workflow](#github-actions-workflow)
- [Checking Bundle Size and Optimizing](#checking-bundle-size-and-optimizing)
- [Acknowledgements](#acknowledgements)
- [Contact Information](#contact-information)

## What AI NEWS APP does

This project displays news and allows the user to:

- Read the news
- Have a real time conversation about the news
- Have suggested question to dig deep in the knowledge provided by the new and expand it

[Back to Table of Contents](#table-of-contents)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone repository-name
   cd repository-name
   ```

- After this choose Method 1 or Method 2

#### Method 1 `plain install in our local machine`

    2. Install dependencies:
        ```bash
        npm install
        # or
        yarn install
        ```

    3. Add environmental variables:
        ```
        .env.sample file provides an example of the env variables used
        ```

    4. Run the development server:
        ```bash
        npm run dev
        # or
        yarn dev
        ```

[Back to Table of Contents](#table-of-contents)

#### Method 2 `Use docker`

Alternatively once you have the project set you can run it using `docker`

    Build the Docker image:
    - Open a terminal and introduce the following command:

    ```bash
        docker build -t ai-news-nextjs-app .
    ```
    Run the docker container:

    ```bash
    docker run -p 3000:3000 ai-news-nextjs-app
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[Back to Table of Contents](#table-of-contents)

## Supabase

This project uses supabase to manage the database in postgress, authentification and real time capabilities.

Supabase is installed as dev dependency, so you can make use of it after intalling the dependencies: 1. Initialize supabase service
`bash
        npx supabase init
        `

    2. Add environmental variables:
        ```
        .env.sample file provides an example of the env variables used
        ```

    3. Start the supabase service:
        ```bash
        npx supabase start
        ```

You can access the Supabase studio dashboard by going to:
Studio URL: http://127.0.0.1:54323

## Usage

To use the application, open your browser and navigate to `http://localhost:3000`. You can browse the latest news articles and search for specific topics.

## Running Tests

To run tests and see the coverage report:

```bash
npm run test
# or
yarn test
```

[Back to Table of Contents](#table-of-contents)

## Project Features

- **Authentication/Authorization**: Sign in, Register, forgot password, managed sessions and Protected routes.
- **AI-Generated Content**: Automatically generate content using AI.
- **Real-Time Chat**: Engage with AI agent through a real-time chat interface.
- **Markdown Rendering**: Render articles and content using Markdown.
- **Responsive Design**: Fully responsive design that works on all devices.
- **SEO Optimization**: Built-in SEO optimization for better search engine visibility.
- **Dark Mode**: Support for dark mode to enhance user experience.
- **Image Optimization**: Optimize images for faster loading times.
- **Incremental Static Regeneration (ISR)**: Update static content after the site has been built.
- **Server-Side Rendering (SSR)**: Fetch data and render pages on the server for each request.
- **API Routes**: Handle server-side logic and data fetching with API routes.
- **Unit and Integration Testing**: Comprehensive unit and integration tests using Jest and React Testing Library.

[Back to Table of Contents](#table-of-contents)

## Technologies Used

| Technology    | Description                                     |
| ------------- | ----------------------------------------------- |
| Next.js       | React framework for server-side rendering       |
| React         | JavaScript library for building user interfaces |
| TypeScript    | Typed superset of JavaScript                    |
| Jest          | JavaScript testing framework                    |
| SWC           | Super-fast JavaScript and TypeScript compiler   |
| Tailwind CSS  | Utility-first CSS framework                     |
| Markdown      | Lightweight markup language                     |
| Winston       | Logger                                          |
| Supabase-auth | Authentication and Session Management           |
| Supabase      | Postgress Database Managemenet with real-time   |
| Vercel        | Deployment, Hosting, Continues Integration      |

[Back to Table of Contents](#table-of-contents)

### Authorization/Authentification

#### Overview

The `AuthenticationForm` component handles user authentication, including sign-in, registration, and password reset functionalities. It uses `supabase-auth` for authentication and Supabase for real-time notifications and other backend interactions.

#### When and Why We Use `supabase-auth` or Supabase

- **`supabase-auth`**:

  - Used for handling authentication processes such as sign-in and session management.
  - Provides secure and easy-to-use authentication mechanisms.
  - Integrates with various authentication providers (e.g., Google, GitHub).

- **Supabase**:
  - Used for real-time notifications and other backend interactions.
  - Provides a PostgreSQL database with real-time capabilities.
  - Offers authentication, storage, and other backend services.

#### Different Actions

1. **Sign-In**

   - Uses `supabase-auth` to handle user sign-in.
   - Function: `handleSignIn` in `authHandlers.ts`.

2. **Registration**

   - Uses Supabase to handle user registration.
   - Function: `handleRegistration` in `authHandlers.ts`.

3. **Password Reset**
   - Uses Supabase to handle password reset.
   - Function: `handleForgotPassword` in `authHandlers.ts`.

[Back to Table of Contents](#table-of-contents)

### Caching Methods

The app uses a Custom In-Memory cache set as a singleton pattern to store data in memory. It was preferred this way after testing the different methods provided in [Next.js 15 Cache documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching).

## Summary

| Method                                 | Description                                                                                     | Usage       | Issues Encountered                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------ |
| **Custom In-Memory Cache**             | A custom cache class using a singleton pattern to store data in memory.                         | Server-Side | - Cache was not shared correctly between server and client.              |
|                                        |                                                                                                 |             | - Cache was not being set correctly before accessing the API endpoint.   |
| **`unstable_cache` from `next/cache`** | Built-in caching utility provided by Next.js for server-side caching with revalidation support. | Server-Side | - Not used in the provided examples, but generally marked as "unstable". |
| **`cache` from React**                 | Caching utility from React, typically used for client-side caching in React components.         | Client-Side | - Not suitable for server-side caching.                                  |
|                                        |                                                                                                 |             | - Cache was not being set correctly in the client-side component.        |

[Back to Table of Contents](#table-of-contents)

### Issues and Resolutions

1. **Custom In-Memory Cache**:

   - **Issue**: Cache was not shared correctly between server and client.
     - **Resolution**: Ensure the cache is a singleton instance and managed on the server side.
   - **Issue**: Cache was not being set correctly before accessing the API endpoint.
     - **Resolution**: Add detailed logging and verify that the cache is being set correctly in the server-side code.

2. **`unstable_cache` from `next/cache`**:

   - **Issue**: Marked as "unstable" and may change in future releases, documentation states that is going to be deprecated.
     - **Resolution**: Simple to use but as it is a potential issue in the near future, another method was prefered.

3. **`cache` from React**:

   - **Issue**: Not suitable for server-side caching.
     - **Resolution**: Use for client-side caching within React components only.

4. **`use cache` from Next15@Canary**:
   - Works and in the future could be an implementation but right now is in experimental phase so opted to use another method more reliable.

[Back to Table of Contents](#table-of-contents)

### Example Implementations

#### Custom In-Memory Cache

```typescript
class Cache {
  private store: Map<string, any> = new Map();

  set(key: string, value: any) {
    this.store.set(key, value);
  }

  get(key: string) {
    return this.store.get(key);
  }

  has(key: string) {
    return this.store.has(key);
  }

  getAll() {
    return Array.from(this.store.entries());
  }
}

const cache = new Cache();
export default cache;
```

[Back to Table of Contents](#table-of-contents)

## CI/CD Pipeline

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). The CI/CD pipeline is configured to run tests and build the project on every push and pull request to the `main` branch.

### Workflow Configuration

The CI/CD workflow is defined in the `.github/workflows/ci.yml` file. It includes the following steps:

1. **Checkout Code**: Checks out the repository code.
2. **Set Up Node.js**: Sets up the Node.js environment.
3. **Install Dependencies**: Installs the project dependencies using `npm install`.
4. **Set Environment Variables**: Sets necessary environment variables for the build process.
5. **Run Tests**: Runs the test suite using `npm test`.
6. **Build Project**: Builds the project using `npm run build`.

### Environment Variables

The following environment variables are set during the CI/CD pipeline:

- `NEXT_PUBLIC_API_URL`: The base URL for the API.
- `ANOTHER_ENV_VAR`: Description of another environment variable.

The variable that are need it on runtime are copied on .env file from github secret storage instead of using them with NEXT_PUBLIC prefix.

### Running the Pipeline

The CI/CD pipeline is triggered automatically on the following events:

- **Push**: When code is pushed to the `main` branch.
- **Pull Request**: When a pull request is opened or updated targeting the `main` branch.

You can monitor the status of the CI/CD pipeline in the "Actions" tab of the GitHub repository.

### Example Workflow File

To check an example please check the file `ci.yml` in the .github/workflows folder in this repository.

## Linting and Formatting

This project uses ESLint and Prettier to maintain code quality and consistency.
It uses Husky to ensure running commands for linting and formatting before each commit.

[Back to Table of Contents](#table-of-contents)

## Project Structure

```plaintext
.
├── app
│   ├── [urlsegment]
│   │   ├── page.tsx
│   │   └── NewsAiContent.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── chat-box
│   │   ├── ChatBox.tsx
│   │   ├── ToDo.md
│   │   └── chatUtils.ts
│   └── markdown-wrapper
│       └── MarkdownWrapper.tsx
├── context
│   └── NewsContext.tsx
├── domain
│   └── posts
│       ├── entities
│       │   └── Post.ts
│       └── repositories
│           └── PostsRepository.ts
├── hooks
│   └── useChatBox.tsx
├── lib
│   ├── data.ts
│   ├── encodingExample.ts
│   └── openai-service.ts
├── news_sample
│   ├── adventure-luna-crystal.md
│   └── sample-posts.ts
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── public
│   └── images
│       ├── apothecary.jpeg
│       ├── garden-potter.jpeg
│       ├── music-shop.jpeg
│       ├── painted-portal.jpeg
│       ├── placeholder.jpg
│       ├── tall-tree-potter.jpeg
│       └── whispers-and-wonders-shop.jpeg
├── styles
│   └── globals.css
├── .env
├── jest.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

[Back to Table of Contents](#table-of-contents)

# Continuous Deployment with Vercel

This project uses Vercel for continuous deployment, ensuring that the latest changes are automatically deployed to the appropriate environment whenever changes are pushed to the respective branches.

## Environments

### Preview Environment

- **Branch**: `any non main branch`
- **Purpose**: Used for testing and previewing changes before they are merged into the main branch.
- **Deployment URL**: Automatically generated by Vercel for each deployment.

### Production Environment

- **Branch**: `main`
- **Purpose**: Used for deploying the stable and production-ready version of the application.
- **Deployment URL**: The main production URL configured in Vercel.

## Prerequisites

- A Vercel account
- A GitHub repository connected to Vercel
- Necessary environment variables set up in Vercel and GitHub

[Back to Table of Contents](#table-of-contents)

## Environment Variables

The following environment variables are required for deployment:

- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `NEWS_API_KEY`: Your News API key
- `OPENAI_API_KEY`: Your OpenAI API key

These variables should be added to both your Vercel project settings and GitHub repository secrets.

[Back to Table of Contents](#table-of-contents)

## GitHub Actions Workflow

The continuous deployment is managed using GitHub Actions. The workflow is defined in the `.github/workflows/production.yml` file.

### Workflow Configuration

```yaml
name: Vercel Production Environment Deployment

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  NEWS_API_KEY: ${{ secrets.NEWS_API_KEY }}
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

on:
  push:
    branches:
      - main
      - development

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_ENV: ${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }}
```

[Back to Table of Contents](#table-of-contents)

## Checking Bundle Size and Optimizing

### Using `depcheck` to Remove Unused Dependencies

`depcheck` helps identify unused dependencies in your project.

1. **Install `depcheck`**:

   ```bash
   npm install -g depcheck
   ```

2. **Run `depcheck`**:

   ```bash
   depcheck
   ```

3. **Review the Output** and remove unused dependencies:
   ```bash
   npm uninstall <unused-dependency>
   ```

[Back to Table of Contents](#table-of-contents)

### Using `webpack-bundle-analyzer`

For detailed analysis of bundle size:

1. **Install `webpack-bundle-analyzer`**:

   ```bash
   npm install --save-dev webpack-bundle-analyzer
   ```

2. **Update Your Webpack Configuration**:

   ```javascript
   // next.config.js
   const withBundleAnalyzer
   ```

```
[Back to Table of Contents](#table-of-contents)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI](https://www.openai.com/)
- [LangChain](https://www.langchain.com/)

## Contact Information

For questions or support, please contact.
[Back to Table of Contents](#table-of-contents)
```
