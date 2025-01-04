# News AI

## What it does

This project displays news and allows the user to:
 - Read the news
 - Have a real time conversation about the news
 - Have suggested question to dig deep in the knowledge provided by the new and expand it

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

### After this choose Method 1 or Method 2
### Method 1 `plain install in our local machine`
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
### Method 2 `Use docker`
Alternatively once you ahve the project set you can run it using docker

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

## Running Tests

To run tests and see the coverage report:

```bash
npm run test
# or
yarn test
```

## Project Features

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

## Technologies Used

| Technology       | Description                                      |
|------------------|--------------------------------------------------|
| Next.js          | React framework for server-side rendering        |
| React            | JavaScript library for building user interfaces  |
| TypeScript       | Typed superset of JavaScript                     |
| Jest             | JavaScript testing framework                     |
| SWC              | Super-fast JavaScript and TypeScript compiler    |
| Tailwind CSS     | Utility-first CSS framework                      |
| Markdown         | Lightweight markup language                      |
| Winston          | Logger                                           |

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

### Using `webpack-bundle-analyzer`

For detailed analysis of bundle size:

1. **Install `webpack-bundle-analyzer`**:
    ```bash
    npm install --save-dev webpack-bundle-analyzer
    ```

2. **Update Your Webpack Configuration**:
    ```javascript
    // next.config.js
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: process.env.ANALYZE === 'true',
    });

    module.exports = withBundleAnalyzer({
      // Other Next.js config options...
    });
    ```

3. **Run the Analyzer**:
    ```bash
    ANALYZE=true npm run build
    ```

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI](https://www.openai.com/)
- [LangChain](https://www.langchain.com/)