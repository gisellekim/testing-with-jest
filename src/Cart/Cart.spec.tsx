import { fireEvent, render } from "@testing-library/react"
import { Cart } from "./Cart"
import { useCartContext } from "../CartContext"
import { CartItemProps } from "./CartItem"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn(),
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

jest.mock("./CartItem", () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  },
}))

describe("Cart", () => {
  describe("Without products", () => {
    beforeEach(() => {
      useCartContextMock.mockReturnValue({
        products: [],
      })
    })
    it("renders empty cart message", () => {
      const { container } = renderWithRouter(() => <Cart />)
      expect(container.innerHTML).toMatch("Your cart is empty.")
    })

    describe("on 'Back to main page' click", () => {
      it("redirects to '/'", () => {
        const { getByText, history } = renderWithRouter(() => <Cart />)
        fireEvent.click(getByText("Back to main page."))
        expect(history.location.pathname).toBe("/")
      })
    })
  })
  describe("With products", () => {
    beforeEach(() => {
      const products = [
        {
          name: "Product Giselle 1",
          price: 100,
          image: "/image/product_1.png",
        },
        {
          name: "Product Giselle 2",
          price: 200,
          image: "/image/product_2.png",
        },
      ]
      useCartContextMock.mockReturnValue({ products, totalPrice: () => 500 })
    })
    it("renders cart products list with total price", () => {
      const { container } = renderWithRouter(() => <Cart />)
      expect(container.innerHTML).toMatch(
        "Product Giselle 1 100 /image/product_1.png"
      )
      expect(container.innerHTML).toMatch(
        "Product Giselle 2 200 /image/product_2.png"
      )
      expect(container.innerHTML).toMatch("Total: 500 Zm")
    })
    describe("on 'Go to checkout' click", () => {
      it("redirects to 'checkout'", () => {
        const { getByText, history } = renderWithRouter(() => <Cart />)
        fireEvent.click(getByText("Go to checkout"))
        expect(history.location.pathname).toBe("/checkout")
      })
    })
  })
})
