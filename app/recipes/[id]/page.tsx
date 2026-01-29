Run npm run build

> build
> next build

⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry

  ▲ Next.js 14.2.5

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...

   We detected TypeScript in your project and reconfigured your tsconfig.json file for you. Strict-mode is set to false by default.
   The following suggested values were added to your tsconfig.json. These values can be changed to fit your project's needs:

   	- include was updated to add '.next/types/**/*.ts'
   	- plugins was updated to add { name: 'next' }

   Collecting page data ...

> Build error occurred
Error: Page "/recipes/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
    at /home/runner/work/-/-/node_modules/next/dist/build/index.js:1294:59
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Span.traceAsyncFn (/home/runner/work/-/-/node_modules/next/dist/trace/trace.js:154:20)
    at async Promise.all (index 7)
    at async /home/runner/work/-/-/node_modules/next/dist/build/index.js:1172:17
    at async Span.traceAsyncFn (/home/runner/work/-/-/node_modules/next/dist/trace/trace.js:154:20)
    at async /home/runner/work/-/-/node_modules/next/dist/build/index.js:1095:124
    at async Span.traceAsyncFn (/home/runner/work/-/-/node_modules/next/dist/trace/trace.js:154:20)
    at async build (/home/runner/work/-/-/node_modules/next/dist/build/index.js:366:9)
Error: Process completed with exit code 1.
