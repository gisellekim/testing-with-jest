import { render } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import { App } from "./App"

jest.mock("./Home", () => ({ Home: () => <div>Home</div> }))

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
  it("renders Home component on root route", () => {
    const history = createMemoryHistory()
    history.push("/") // push the root url to our history object before rendering the App component
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch("Home")
  })
})
