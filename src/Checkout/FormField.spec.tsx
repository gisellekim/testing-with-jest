import { fireEvent, render } from "@testing-library/react"
import { FormField } from "./FormField"

describe("FormField", () => {
  it("renders correctly", () => {
    const { getByLabelText } = render(
      <FormField label="Giselle label" name="Giselle" />
    )
    const input = getByLabelText("Giselle label:")
    expect(input).toBeInTheDocument()
    expect(input).not.toHaveClass("is-error")
    expect(input).toHaveAttribute("name", "Giselle")
  })

  describe("With error", () => {
    it("renders error message", () => {
      const { getByText } = render(
        <FormField
          label="Giselle label"
          name="Giselle"
          errors={{ message: "Example error" }}
        />
      )
      expect(getByText("Error: Example error")).toBeInTheDocument()
    })
  })

  describe("On change", () => {
    it("normalizes the input", () => {
      const { getByLabelText } = render(
        <FormField
          label="Giselle label"
          name="Giselle"
          errors={{ message: "Example error" }}
          normalize={(value: string) => value.toUpperCase()}
        />
      )
      const input = getByLabelText("Giselle label:") as HTMLInputElement
      fireEvent.change(input, { target: { value: "test" } })
      expect(input.value).toEqual("TEST")
    })
  })
})
