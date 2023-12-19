import { CartWidget } from "./CartWidget/CartWidget"
import { useCartContext } from "../CartContext"
import { fireEvent } from "@testing-library/react"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn(),
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

describe("CartWidget", () => {
  it.todo("shows the amount of products in the cart", () => {})
  it("navigates to cart summary page on click", () => {
    useCartContextMock.mockReturnValue({
      products: [
        {
          name: "name",
          price: 0,
          image: "image.png",
        },
      ],
    })
    const { getByRole, history } = renderWithRouter(() => <CartWidget />)
    fireEvent.click(getByRole("link"))
    expect(history.location.pathname).toEqual("/cart")
  })
})
