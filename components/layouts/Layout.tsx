import { ReactElement } from "react"
import Head from "next/head"
import { Navbar } from "../ui";

interface Props {
  children?:ReactElement|ReactElement[];
  title?:string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout = ({ children, title }:Props) => {

  return (
    <>
      <Head>
        <title>{ title || 'Pokemon App' }</title>
        <meta name="author" content="Jose Pardo" />
        <meta name="description" content="Info sobre el pokemon XXX" />
        <meta name="keywords" content={`${ title }, pokemon, pokedex`} />
        <meta property="og:title" content={`Informacion sobre ${ title }`} />
        <meta property="og:description" content={`Esta es la pagina sobre ${ title }`} />
        <meta property="og:image" content={`${ origin }/img/banner.png`} />
      </Head>
      <Navbar />
      <main style={{
        padding: '0px 20px'
      }}>
        { children }
      </main>
    </>
  )
}
