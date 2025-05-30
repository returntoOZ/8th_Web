import { FaShoppingCart } from "react-icons/fa"
import { useDispatch, useSelector } from "../hooks/useCustomRedux"
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";

const Navbar = () => {
    const { cartItems, amount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [dispatch, cartItems]);

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800">
            <h1 onClick={() => {
                window.location.href = '/';
            }}
                className="text-2xl text-white font-semibold cursor-pointer">Ohthani Ahn</h1>
            <div className="flex items-center">
                <FaShoppingCart className="text-2xl text-white" />
                <span className="text-xl text-white font-medium">{amount}</span>
            </div>
        </div>
    )
}

export default Navbar