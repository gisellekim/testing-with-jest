import { act, fireEvent, render, waitFor } from "@testing-library/react"
import { CheckoutForm } from "./CheckoutForm"

describe("CheckoutForm", () => {
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />)
    expect(container.innerHTML).toMatch("Cardholders Name")
    expect(container.innerHTML).toMatch("Card Number")
    expect(container.innerHTML).toMatch("Expiration Date")
    expect(container.innerHTML).toMatch("CVV")
  })

  describe("With invalid inputs", () => {
    it("shows errors", async () => {
      const { container, getByText } = render(<CheckoutForm />)
      await act(async () => {
        fireEvent.click(getByText("Place order"))
      })
      expect(container.innerHTML).toMatch("Error:")
    })
  })

  describe("With valid inputs", () => {
    describe("on 'Place order' button click", () => {
      it("calls submit function with form data", async () => {
        const mockSubmit = jest.fn()
        const { getByLabelText, getByText } = render(
          <CheckoutForm submit={mockSubmit} />
        )
        fireEvent.change(getByLabelText("Cardholders Name:"), {
          target: {
            value: "Giselle",
          },
        })
        fireEvent.change(getByLabelText("Card Number:"), {
          target: {
            value: "0000 0000 0000 0000",
          },
        })
        fireEvent.change(getByLabelText("Expiration Date:"), {
          target: {
            value: "9999-01",
          },
        })
        fireEvent.change(getByLabelText("CVV:"), {
          target: {
            value: "000",
          },
        })
        fireEvent.click(getByText("Place order"))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
      })
    })
  })
})
