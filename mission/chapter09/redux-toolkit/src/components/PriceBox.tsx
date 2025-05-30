import { useEffect } from "react";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { calculateTotals, clearCart } from "../slices/cartSlice";

const PriceBox = () => {
    const { cartItems, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleInitializeCart = () => {
        dispatch(clearCart());
    };

    useEffect(() => {
        dispatch(calculateTotals());
    }, [dispatch, cartItems]);

    return (
        <div className="p-12 flex justify-between">
            <div onClick={handleInitializeCart} className="border p-4 rounded-md cursor-pointer">장바구니 초기화</div>
            <div>총 가격 : {total}원</div>
        </div>
    )
}

export default PriceBox