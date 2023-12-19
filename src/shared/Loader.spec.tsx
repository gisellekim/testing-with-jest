import { Loader } from "./Loader"
import { render } from "@testing-library/react"

describe("", () => {
  it("renders correctly", () => {
    const { container } = render(<Loader />)
    expect(container.innerHTML).toMatch("Loading")
  })
})
