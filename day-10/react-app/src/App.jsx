import ProductList from './components/ProductList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Day 10: Styling with Tailwind CSS</h1>
          <p className="mt-1 text-indigo-200">Beautiful and responsive product catalog using component-based styling</p>
        </div>
      </header>
      
      <main>
        <ProductList />
      </main>
      
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© 2025 Product Catalog - Built with React & Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
