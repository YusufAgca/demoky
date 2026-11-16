import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ProductCard } from "../ProductCard";
import { Product } from "@/types";
import { hasActiveDiscount } from "@/lib/utils";

describe("React Component: ProductCard & Price Discount Logic Unit Tests", () => {
  const mockProduct: Product = {
    id: 999,
    productId: 999,
    title: "Vintage Handwoven Kilim Pillow",
    link: "999/vintage-handwoven-kilim-pillow",
    image: "https://cdn.elonky.com/product/test-pillow.webp",
    price: 40,
    discountedPrice: 28,
    currencySymbol: "$",
    discountPercentage: 30,
    sellerName: "AnatolianHeritage",
    rating: 4.9,
    reviewsCount: 38,
    isFreeShipping: true,
  };

  it("should render product title, seller, and discounted price correctly", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText("Vintage Handwoven Kilim Pillow")).toBeInTheDocument();
    expect(screen.getByText("AnatolianHeritage")).toBeInTheDocument();
    expect(screen.getByText("$28.00")).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument();
  });

  it("should render discount and free shipping badges", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText("30% OFF")).toBeInTheDocument();
    expect(screen.getByText("FREE SHIPPING")).toBeInTheDocument();
  });

  it("should render rating and review count", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("(38)")).toBeInTheDocument();
  });

  it("should not render duplicate strikethrough price when discountedPrice equals price", () => {
    const nonDiscountedProduct: Product = {
      ...mockProduct,
      id: 1000,
      price: 130,
      discountedPrice: 130,
      discountPercentage: null,
    };

    expect(hasActiveDiscount(130, 130)).toBe(false);
    expect(hasActiveDiscount(130, undefined)).toBe(false);
    expect(hasActiveDiscount(130, 99)).toBe(true);

    render(
      <Provider store={store}>
        <ProductCard product={nonDiscountedProduct} />
      </Provider>
    );

    const priceNodes = screen.getAllByText("$130.00");
    expect(priceNodes).toHaveLength(1);
  });
});
