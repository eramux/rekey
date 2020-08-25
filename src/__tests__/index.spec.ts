// const renamejs = require('../index')
import { deleteKey, renameKey } from "../index"
import { describe, expect, test } from '@jest/globals'
import { recursiveKeyTraversal } from "../rekey"

describe("correctly modifies keys of objects", () => {
  let testObject: any = {}
  beforeEach(() => {
    testObject = {
      test: {
        name: "test",
        age: 32,
        settings: {
          color: "#ffaabb",
          names: ["ak", "cthulu"]
        },
        rooms: [
          {
            name: "Deluxe",
            price: 123.32
          },
          {
            name: "Economy",
            price: 10,
            broken: true,
            guests: [
              {
                name: "John"
              },
              {
                name: "Doe",
                age: 123
              },
              "strage value hmmmmm..."
            ]
          }
        ]
      }
    }
  })
  it("modifies object keys", () => {
    renameKey(testObject, "test.name", "name_update")
    renameKey(testObject, "test.settings.color", "color_update")
    expect(testObject).toHaveProperty('test.name_update')
    expect(testObject).toHaveProperty('test.settings.color_update')
  })
  it("modifies testObject array keys", () => {
    renameKey(testObject, "test.rooms.name", "room_name")
    expect(testObject.test.rooms[0].room_name).toEqual("Deluxe")
  })
})

describe("correctly deletes keys of objects", () => {
  let testObject: any = {}
  beforeEach(() => {
    testObject = {
      test: {
        name: "test",
        age: 32,
        settings: {
          color: "#ffaabb",
          names: ["ak", "cthulu"]
        },
        rooms: [
          {
            name: "Deluxe",
            price: 123.32
          },
          {
            name: "Economy",
            price: 10,
            broken: true,
            guests: [
              {
                name: "John"
              },
              {
                name: "Doe",
                age: 123
              },
              "strage value hmmmmm..."
            ]
          }
        ]
      }
    }
  })
  it("deltes object keys", () => {
    deleteKey(testObject, "test.name")
    expect(testObject.test).not.toHaveProperty("name")
  })
})

describe("recursive key traversal", () => {
  it("ignores null values", () => {
    let test = {
      item: {
        user: null
      }
    }

    let result = recursiveKeyTraversal(test, ["item", "user", "username"], (object, key) => {
      console.log(object, key)
      return true
    })

    expect(result).toBe(false)

  })
  // it("ignores null values in arrays", () => {
  //   let test = {
  //     item: [null, {
  //       user: "john"
  //     }]
  //   }

  //   let result = recursiveKeyTraversal(test, ["item", "user"], (object, key) => {
  //     console.log(object, key)
  //     return true
  //   })

  //   expect(result).toBe(true)

  // })

})