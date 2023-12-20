import { CartItemProps } from "./CartItem"

jest.mock("./CartItem", () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  },
}))
