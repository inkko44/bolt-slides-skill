import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Gallery from './Gallery'
import './styles/tokens.css'
import './styles/base.css'

/* Local dev routing: the component gallery is the default view; the deck demo
   lives at #deck. The deck owns numeric hashes (#1, #2…) for its slides. */
function Root() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const isDeck = hash === '#deck' || /^#\d+$/.test(hash)
  return isDeck ? <App /> : <Gallery />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
