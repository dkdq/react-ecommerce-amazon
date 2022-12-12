// import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get('/api/products');
  //     setProducts(result.data);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          // <div>Loading...</div>
          <LoadingBox />
        ) : error ? (
          // <div>{error}</div>
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          // products.map((product) => (
          //   <div className="product" key={product.slug}>
          //     <Link to={`/product/${product.slug}`}>
          //       <img src={product.image} alt={product.name} />
          //     </Link>
          //     <div className="product-info">
          //       <Link to={`/product/${product.slug}`}>
          //         <p>{product.name}</p>
          //       </Link>
          //       <p>
          //         <strong>${product.price}</strong>
          //       </p>
          //       <button>Add to cart</button>
          //     </div>
          //   </div>
          // ))
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
