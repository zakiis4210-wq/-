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
Failed to compile.

./app/recipes/[id]/page.tsx
Error: 
  x Expected ';', '}' or <eof>
   ,-[/home/runner/work/-/-/app/recipes/[id]/page.tsx:1:1]
 1 | Run npm run build
   : ^|^ ^^^
   :  `-- This is the expression part of an expression statement
 2 | 
 3 | > build
 4 | > next build
   `----

Caused by:
    Syntax Error

Import trace for requested module:
./app/recipes/[id]/page.tsx


> Build failed because of webpack errors
Error: Process completed with exit code 1.
