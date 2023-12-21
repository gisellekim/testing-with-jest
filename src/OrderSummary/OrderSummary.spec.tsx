import { fireEvent, render } from "@testing-library/react"
import { OrderSummary } from "./OrderSummary"
import { useOrder } from "./useOrder"

jest.mock("./useOrder", () => ({
  useOrder: jest.fn(),
}))

const useOrderMock = useOrder as unknown as jest.Mock<
  Partial<ReturnType<typeof useOrder>>
>

describe("OrderSummary", () => {
  afterEach(jest.clearAllMocks)

  describe("While order data beling loaded", () => {
    it("renders loader", () => {
      useOrderMock.mockReturnValue({
        isLoading: true,
        order: undefined,
      })
      const { container } = render(<OrderSummary />)
      expect(container.innerHTML).toMatch("Loading")
    })
  })

  describe("When order is loaded", () => {
    beforeEach(() => {
      useOrderMock.mockReturnValue({
        isLoading: false,
        order: {
          products: [
            {
              name: "Product Giselle",
              price: 100,
              image: "/product.png",
            },
          ],
        },
      })
    })

    it("renders order info", () => {
      const { container } = renderWithRouter(() => <OrderSummary />)
      expect(container.innerHTML).toMatch("Product Giselle")
    })

    it("nasvigates to main page on button click", () => {
      const { getByText, history } = renderWithRouter(() => <OrderSummary />)
      fireEvent.click(getByText("Back to the store"))
      expect(history.location.pathname).toEqual("/")
    })
  })

  describe("Without order", () => {
    it("renders error message", () => {
      useOrderMock.mockReturnValue({
        isLoading: false,
        order: undefined,
      })
      const { container } = renderWithRouter(() => <OrderSummary />)
      expect(container.innerHTML).toMatch("Couldn't load order info.")
    })
  })
})
