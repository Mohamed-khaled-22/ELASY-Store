
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, deleteItem, incrementItem, decrementItem } from '../Features/Cart/CartSlice';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

function CardOfProduct({ product }) {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const [quantity, setQuantity] = useState(storedItems.some((item) => item.id === product.id) ? storedItems.find((item) => item.id === product.id).quantity : 1);

    const [isAdded, setIsAdded] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {

        if (storedItems.some((item) => item.id === product.id)) {
            setIsAdded(true);
        } else {
            setIsAdded(false);
        }
    }, [product]);

    return (

        <div className=" bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-2 ">
            <Link to={`/productDetails/${product.id}`}>
                <div className="image h-56 overflow-hidden flex justify-center items-center p-2">
                    <img
                        loading='lazy'
                        src={`../../public/Image/Products/${product.image}`}
                        alt={product.name}
                        className=" mx-auto  max-h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>
            </Link>

            {/* Card Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.name}</h3>

                <Link to={`/productDetails/${product.id}`}>
                    <div className="flex justify-between items-center mb-3">
                        <div className="rating flex items-center">
                            <div className="stars flex mr-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill={i < product.rating ? 'greenyellow' : 'rgb(230 235 244)'} color={i < product.rating ? 'greenyellow' : 'rgb(230 235 244)'} />
                                ))}
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">Sold: {product.sold}</span>
                    </div>
                </Link>

                {/* description */}
                <Link to={`/productDetails/${product.id}`}>
                    <div className="description h-20 overflow-hidden mb-4">
                        <p className="text-gray-600 text-sm leading-5 hover:text-blue-500">{product.description}</p>
                    </div>
                </Link>

                {/* price & stock */}
                <Link to={`/productDetails/${product.id}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className={` text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of stock'}
                        </span>
                        <span className="text-lg font-bold text-blue-700 ">${product.price}</span>
                    </div>
                </Link>

                {/* add to cart button */}
                {isAdded ?
                    <div className="flex flex-col items-center justify-center gap-3">
                        <button onClick={() => { toast.success(`product removed from cart successfully!`); setQuantity(1); setIsAdded(false); dispatch(deleteItem(product)) }} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs sm:text-sm">
                            Remove
                        </button>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button onClick={() => { setQuantity((pre) => pre > 1 ? pre - 1 : 1); product.quantity > 1 && dispatch(decrementItem(product)) }} className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition text-sm">
                                -
                            </button>
                            <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-md font-medium text-sm">
                                {quantity}
                            </span>
                            <button onClick={() => { setQuantity((pre) => pre + 1); dispatch(incrementItem(product)) }} className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition text-sm">
                                +
                            </button>
                        </div>
                    </div> :
                    <button
                        onClick={() => { toast.success(`product added to cart successfully!`); setIsAdded(true); dispatch(addItem(product)) }}
                        className={`w-full py-2 px-4 rounded-lg font-semibold text-base transition-colors duration-300 ${product.stock > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            }`}
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0 ? 'Add to Cart' : "Not available now"}
                    </button>
                }

            </div>
        </div>

    )
}

export default CardOfProduct
