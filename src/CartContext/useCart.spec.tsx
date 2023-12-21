import { act, renderHook } from "@testing-library/react-hooks"
import { useCart } from "./useCart"
import { Product } from "../shared/types"

const localStorageMock = (() => {
  let store: { [key: string]: string } = {}

  return {
    clear: () => {
      store = {}
    },
    getItem: (key: string) => store[key] || null,
    removeItem: (key: string) => {
      delete store[key]
    },
    setItem: (key: string, value: string) => {
      store[key] = value ? value.toString() : "" // String(value)
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("useCart", () => {
  afterEach(() => {
    localStorageMock.clear()
    jest.restoreAllMocks()
  })

  describe("on mount", () => {
    it("it loads data from localStorage", () => {
      const products: Product[] = [
        {
          name: "Product Giselle 1",
          price: 100,
          image: "/image/product_1.png",
        },
      ]

      localStorageMock.setItem("products", JSON.stringify(products))
      const { result } = renderHook(useCart)
      expect(result.current.products).toEqual(products)
    })
  })

  describe("#addToCart", () => {
    it("adds item to the cart", () => {
      const product: Product = {
        name: "Product Giselle 1",
        price: 100,
        image: "/image/product_1.png",
      }

      const { result } = renderHook(useCart)
      const setItemSpy = jest.spyOn(localStorageMock, "setItem")
      act(() => result.current.addToCart(product))
      expect(result.current.products).toEqual([product])
      expect(setItemSpy).toHaveBeenCalledWith(
        "products",
        JSON.stringify([product])
      )
      setItemSpy.mockRestore()
    })
  })

  describe("#removeFromCart", () => {
    it("removes item from the cart", () => {
      const product: Product = {
        name: "Product Giselle 1",
        price: 100,
        image: "/image/product_1.png",
      }

      localStorageMock.setItem("product", JSON.stringify([product]))
      const { result } = renderHook(useCart)
      const setItemSpy = jest.spyOn(localStorageMock, "setItem")
      act(() => result.current.removeFromCart(product))
      expect(result.current.products).toEqual([])
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]")
      setItemSpy.mockRestore()
    })
  })

  describe("totalPrice", () => {
    it("returns total products price", () => {
      const product: Product = {
        name: "Product Giselle 1",
        price: 100,
        image: "/image/product_1.png",
      }

      localStorageMock.setItem("products", JSON.stringify([product, product]))
      const { result } = renderHook(useCart)
      expect(result.current.totalPrice()).toEqual(200)
    })
  })

  describe("clearCart", () => {
    it("removes all the products from the cart", () => {
      const product: Product = {
        name: "Product Giselle 1",
        price: 100,
        image: "/image/product_1.png",
      }

      localStorageMock.setItem("products", JSON.stringify([product, product]))
      const { result } = renderHook(useCart)
      const setItemSpy = jest.spyOn(localStorageMock, "setItem")
      act(() => result.current.clearCart())
      expect(result.current.products).toEqual([])
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]")
      setItemSpy.mockRestore()
    })
  })
})
