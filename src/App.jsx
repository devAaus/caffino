import Hero from "./components/Hero"
import Layout from "./components/Layout"

function App() {
  const isAuthenticated = false
  return (
    <Layout>
      <Hero />
    </Layout>
  )
}

export default App