import { fireEvent } from "@testing-library/react"
import { Cart } from "./Cart"
import { useCartContext } from "../CartContext"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn(),
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

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
          price: 100,
          image: "/image/product_2.png",
        },
      ]
      useCartContextMock.mockReturnValue({ products, totalPrice: () => 55 })
    })
    describe("on 'Go to checkout' click", () => {
      it("redirects to 'checkout'", () => {})
    })
  })
})
