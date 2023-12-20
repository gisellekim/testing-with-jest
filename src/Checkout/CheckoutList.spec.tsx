import { render } from "@testing-library/react"
import { Product } from "../shared/types"
import { Checkout } from "./Checkout"
import { CheckoutList } from "./CheckoutList"

describe("Checkout", () => {
  it("renders list of products", () => {
    const products: Product[] = [
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
    const { container } = render(<CheckoutList products={products} />)
    expect(container.innerHTML).toMatch("Product Giselle 1")
    expect(container.innerHTML).toMatch("Product Giselle 2")
  })
})
