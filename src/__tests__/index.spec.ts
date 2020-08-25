// const renamejs = require('../index')
import { deleteKey, renameKey } from "../index"
import { describe, expect, test } from '@jest/globals'
import { recursiveKeyTraversal } from "../rekey"

describe("recursive key traversal", () => {
  let testObject: any = {}
  beforeEach(() => {
    testObject = {
      test: {
        name: "test",
        age: 32,
        failure: null,
        settings: {
          color: "#ffaabb",
          names: ["ak", "cthulu"]
        },
        rooms: [
          null,
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
    expect(testObject.test.rooms[1].room_name).toEqual("Deluxe")
  })
  it("stops the recursion if object does not have the selector property", () => {
    let referenceObject = Object.assign({}, testObject)
    renameKey(testObject, "test.cthulu.name", "main")
    expect(testObject).toEqual(referenceObject)
  })
  it("stops the recurstion if a selector paht element has a null value", () => {
    let referenceObject = Object.assign({}, testObject)
    renameKey(testObject, "test.failure.name", "street")
    expect(testObject).toEqual(referenceObject)
  })
  it("modifies first level array elements", () => {
    let arrayTestObject: any = [
      {
        arraytest: "hello",
        elements: [
          {
            name: "cool"
          },
          {
            name: "naw"
          }
        ]
      }
    ]
    renameKey(arrayTestObject, "arraytest", "arraytest_replace")
    expect(arrayTestObject[0].arraytest_replace).toEqual("hello")

    renameKey(arrayTestObject, "elements.name", "coolio")
    expect(arrayTestObject[0].elements[0].coolio).toEqual("cool")
  })
  it("deltes object keys", () => {
    deleteKey(testObject, "test.name")
    expect(testObject.test).not.toHaveProperty("name")
  })
})
