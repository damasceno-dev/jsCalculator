This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project was made in order to get fcc front end libraries certification.
For the code pen link with the test suite, please use the link below.

## Code pen link
https://codepen.io/damasceno-dev/pen/eYQQEmR

There are two main differences between code pen and next js project. They are:
1) Google fonts:
* NextJs: 
import the function using next/fonts. Create a constant with the font, and use it on tailwind classname:
``` 
    import { Orbitron } from 'next/font/google'
    # then
    const orbitron = Orbitron({subsets: ['latin'], variable: '--font-orbitron', weight: '400'})
    # then 
    <div id='display' className={`min-h-[2.5rem] break-all text-cyan-100 text-right w-full bg-slate-600 flex place-content-end place-items-center pr-1 text-2xl ${orbitron.className}`}>Orbitron font text here</div>
```

* Code pen: 
Import the fonts on the .js file with the WebFont loader, and used the jsx style attribute to set the fonts for the individual elements:
    
```bash
	WebFont.load({
		google: {
			families: ['Orbitron:400', 'Nova+Square:400']
		}
	});
# then
style={{fontFamily: 'Nova Square'}}
```

2) Font awsome icons:

* NextJs: 
import and use like the following: 
```bash
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
# then
      <FontAwesomeIcon
        icon={faCheck}
        className="fas fa-check"
        style={{ color: "red", fontSize: 64 }}
      />
```
* Code pen:
import the script tag using the link
```
https://kit.fontawesome.com/778fdc401a.js
```
use it like a normal tag: 
```
      <i
        name={operation}
        className={`fas ${icon} text-slate-400 group-hover:text-white group-hover:transition-all duration-500`}
        style={{ fontSize: 16 }}
      />
```



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
