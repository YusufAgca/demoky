import cartReducer, {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  CartState,
} from "../cartSlice";
import { Product } from "@/types";

describe("Redux Toolkit: cartSlice Unit Tests", () => {
  const mockProduct: Product = {
    id: 101,
    productId: 101,
    title: "Handmade Ceramic Mug",
    link: "101/handmade-ceramic-mug",
    image: "https://cdn.elonky.com/product/test.webp",
    price: 25,
    discountedPrice: 20,
    currencySymbol: "$",
    discountPercentage: 20,
  };

  const initialState: CartState = {
    items: [],
    isOpen: false,
    totalQuantity: 0,
    totalAmount: 0,
  };

  it("should initialize with default empty state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should add a new product and recalculate totals properly", () => {
    const nextState = cartReducer(
      initialState,
      addItem({ product: mockProduct, quantity: 2 })
    );

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].product.id).toBe(101);
    expect(nextState.items[0].quantity).toBe(2);
    expect(nextState.totalQuantity).toBe(2);
    expect(nextState.totalAmount).toBe(40); // 2 * $20 discounted price
    expect(nextState.isOpen).toBe(true); // Should auto-open drawer
  });

  it("should increment quantity when existing product is added again", () => {
    const stateWithOne = cartReducer(
      initialState,
      addItem({ product: mockProduct, quantity: 1 })
    );
    const stateWithTwo = cartReducer(
      stateWithOne,
      addItem({ product: mockProduct, quantity: 2 })
    );

    expect(stateWithTwo.items).toHaveLength(1);
    expect(stateWithTwo.items[0].quantity).toBe(3);
    expect(stateWithTwo.totalQuantity).toBe(3);
    expect(stateWithTwo.totalAmount).toBe(60);
  });

  it("should update quantity of an existing item", () => {
    const stateWithItem = cartReducer(
      initialState,
      addItem({ product: mockProduct, quantity: 3 })
    );
    const updatedState = cartReducer(
      stateWithItem,
      updateQuantity({ productId: 101, quantity: 5 })
    );

    expect(updatedState.items[0].quantity).toBe(5);
    expect(updatedState.totalQuantity).toBe(5);
    expect(updatedState.totalAmount).toBe(100);
  });

  it("should remove item completely from cart", () => {
    const stateWithItem = cartReducer(
      initialState,
      addItem({ product: mockProduct, quantity: 2 })
    );
    const stateAfterRemoval = cartReducer(stateWithItem, removeItem(101));

    expect(stateAfterRemoval.items).toHaveLength(0);
    expect(stateAfterRemoval.totalQuantity).toBe(0);
    expect(stateAfterRemoval.totalAmount).toBe(0);
  });

  it("should toggle drawer open and close states", () => {
    let state = cartReducer(initialState, openCart());
    expect(state.isOpen).toBe(true);

    state = cartReducer(state, closeCart());
    expect(state.isOpen).toBe(false);
  });
});
