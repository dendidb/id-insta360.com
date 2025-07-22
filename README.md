# Insta360 Website Home Page

This project is a reimplementation of the Insta360 website home page using Next.js and TailwindCSS.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Placeholder Images

The project uses public placeholder image APIs. You don't need to manually create image files. The image URLs in the components are using placeholder formats. Here are the public API options you can use:

1. **Placeholder.com**: Simple colored placeholders with custom dimensions
   ```
   https://via.placeholder.com/800x600
   ```

2. **Picsum.photos**: Beautiful random stock photos
   ```
   https://picsum.photos/800/600
   ```
   
3. **Loremflickr**: Random images on specific topics
   ```
   https://loremflickr.com/800/600/camera
   ```

To use these in your components, replace the current placeholder paths like this:

```jsx
// Before
<Image
  src="/placeholder-hero.jpg" 
  alt="Insta360 X5"
  fill
  className="object-cover opacity-90"
  priority
/>

// After
<Image
  src="https://picsum.photos/1600/900" 
  alt="Insta360 X5"
  fill
  className="object-cover opacity-90"
  priority
/>
```

For the logo and app UI image, consider using services like:
- https://placeholder.com/
- https://dummyimage.com/

## Project Structure

- `/src/app/page.tsx` - Main homepage component
- `/src/components/home/` - Home page section components
- `/src/data/homepage.json` - Data for the homepage sections

## Features

- Responsive design that works on mobile, tablet, and desktop
- Product showcase section with filtering
- Shop by Interest section with categories
- Product finder and comparison tool links
- Insta360+ app showcase
- News and blog section
- Enterprise solutions section
- Support links section

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# id-insta360.com" 
