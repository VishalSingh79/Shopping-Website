import React,{useState,useEffect} from 'react'
import "./Products.css"
import { apiConnector } from '../Services/apiConnector';
import { useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';

function Products() {
  const navigate = useNavigate();
  const [products,setProducts]=useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          apiConnector("GET","https://api.escuelajs.co/api/v1/products"),
          apiConnector("GET","https://api.escuelajs.co/api/v1/categories")
        ]);
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  },[]);

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = () => {
    if (!selectedCategory) {
      setFilteredProducts(products);
      return;
    }
    navigate(`/products/category/${selectedCategory}`);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct({
      title: product.title,
      image: product.images[0],
      description: product.description,
      price: product.price
    });
  };

  if (loading) {
    return <div className="product-grid-container">Loading...</div>;
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} />;
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button onClick={handleFilter}>Filter</button>
      </div>

      <div className="product-grid">
        {filteredProducts.length === 0 ? 
          <p>No products found.</p> :
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.images[0]} alt={product.title} className="product-image1" />
              <div className="product-content1">
                <p className="product-title1">{product.title}</p>
                <p className="product-description1">{product.description}</p>
                <p className="product-price1">${product.price}</p>
                <button 
                  className="view-details-button1"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Products
