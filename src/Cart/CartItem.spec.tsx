import { fireEvent } from "@testing-library/react"
import { Product } from "../shared/types"
import { CartItem } from "./CartItem"

const product: Product = {
  name: "Product Giselle",
  price: 100,
  image: "/image/product.png",
}

describe("CartItem", () => {
  it("renders correctly", () => {
    const { container, getByAltText } = renderWithRouter(() => (
      <CartItem product={product} removeFromCart={() => {}} />
    ))
    expect(container.innerHTML).toMatch("Product Giselle")
    expect(container.innerHTML).toMatch("100 Zm")
    expect(getByAltText("Product Giselle")).toHaveAttribute(
      "src",
      "/image/product.png"
    )
  })

  describe("on 'Remove' click", () => {
    it("calles passed in function", () => {
      const removeFromCartMock = jest.fn()
      const { getByText } = renderWithRouter(() => (
        <CartItem product={product} removeFromCart={removeFromCartMock} />
      ))
      fireEvent.click(getByText("Remove"))
      expect(removeFromCartMock).toBeCalledWith(product)
    })
  })
})
