# AI News Next.js App

## Introduction
This project is an AI-powered news application built with Next.js. It fetches and displays the latest news articles using AI algorithms to curate content.


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
#### Method 2 `Use docker`
Alternatively once you have the project set you can run it using ``docker``

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

## Usage
To use the application, open your browser and navigate to `http://localhost:3000`. You can browse the latest news articles and search for specific topics.


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


### Caching Methods 
The app uses a Custom In-Memory cache set as a singleton pattern to store data in memory. It was preferred this way after testing the different methods provided in [Next.js 15 Cache documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching).

## Summary

| Method                        | Description                                                                 | Usage            | Issues Encountered                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|------------------|------------------------------------------------------------------------------------|
| **Custom In-Memory Cache**    | A custom cache class using a singleton pattern to store data in memory.     | Server-Side      | - Cache was not shared correctly between server and client.                        |
|                               |                                                                             |                  | - Cache was not being set correctly before accessing the API endpoint.             |
| **`unstable_cache` from `next/cache`** | Built-in caching utility provided by Next.js for server-side caching with revalidation support. | Server-Side      | - Not used in the provided examples, but generally marked as "unstable".           |
| **`cache` from React**        | Caching utility from React, typically used for client-side caching in React components. | Client-Side      | - Not suitable for server-side caching.                                            |
|                               |                                                                             |                  | - Cache was not being set correctly in the client-side component.                  |

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

## Contact Information
For questions or support, please contact.