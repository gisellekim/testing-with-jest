import { render } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import { App } from "./App"

jest.mock("./Home", () => ({ Home: () => <div>Home</div> }))
jest.mock("./Cart", () => ({ Cart: () => <div>Cart</div> }))
jest.mock("./OrderSummary", () => ({
  OrderSummary: () => <div>Order summary</div>,
}))
jest.mock("./Checkout", () => ({
  Checkout: () => <div>Checkout</div>,
}))

describe("App", () => {
  it("renders successfuly", () => {
    const history = createMemoryHistory() // including URL, location
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch("Goblin Store")
  })

  describe("routing", () => {
    it("renders home page on '/'", () => {
      const { container } = renderWithRouter(() => <App />, "/")
      expect(container.innerHTML).toMatch("Home")
    })
    it("renders the cart page on '/cart'", () => {
      const { container } = renderWithRouter(() => <App />, "/cart")
      expect(container.innerHTML).toMatch("Cart")
    })

    it("renders order summary page on '/order'", () => {
      const { container } = renderWithRouter(() => <App />, "/order")
      expect(container.innerHTML).toMatch("Order summary")
    })

    it("renders checkout page on '/checkout'", () => {
      const { container } = renderWithRouter(() => <App />, "/checkout")
      expect(container.innerHTML).toMatch("Checkout")
    })

    it("renders 'page not found' message on nonexistent route", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/this-route-does-not-exist"
      )
      expect(container.innerHTML).toMatch("Page not found")
    })
  })
})
