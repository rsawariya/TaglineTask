import { Layout } from "./components"
import Home from "./pages/Home"
import { DataProvider } from "./context/DataContext"

function App() {
  return (
    <DataProvider>
      <Layout>
        <Home />
      </Layout>
    </DataProvider>
  )
}

export default App
