import { render } from "@testing-library/react"
import { useProducts } from "./useProducts"
import { Home } from "./Home"
import { ProductCardProps } from "./ProductCard"
import { Category } from "../shared/types"

jest.mock("./useProducts", () => ({ useProducts: jest.fn() }))
const useProductsMock = useProducts as unknown as jest.Mock<
  Partial<ReturnType<typeof useProducts>>
>

jest.mock("./ProductCard", () => ({
  ProductCard: ({ datum }: ProductCardProps) => {
    const { name, price, image } = datum
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  },
}))

describe("Home", () => {
  describe("while loading", () => {
    it("renders loader", () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: true,
        error: false,
      })
      const { container } = render(<Home />)
      expect(container.innerHTML).toMatch("Loading")
    })
  })

  describe("with data", () => {
    it("renders categories with products", () => {
      const category: Category = {
        name: "Category Giselle",
        items: [{ name: "Product Giselle", price: 50, image: "/product.jpg" }],
      }

      useProductsMock.mockReturnValue({
        categories: [category],
        isLoading: false,
        error: false,
      })

      const { container } = render(<Home />)
      expect(container.innerHTML).toMatch("Category Giselle")
      expect(container.innerHTML).toMatch("Product Giselle 50 /product.jpg")
    })
  })

  describe("with error", () => {
    it("renders error message", () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: false,
        error: true,
      })
    })
    const { container } = render(<Home />)
    expect(container.innerHTML).toMatch("Error")
  })
})
