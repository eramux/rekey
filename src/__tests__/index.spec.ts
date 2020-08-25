const renamejs = require('../index')
import { describe, expect, test } from '@jest/globals'


describe("correctly modifies objects", () => {
  let object: object = {}
  beforeEach(() => {
    object = {
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
                name: "Uthumbu"
              },
              {
                name: "lububub",
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

    // renamejs.rename("test.key.in.here", "away", object)
    renamejs.rekey("test.name", "name_update", object)
    renamejs.rekey("test.settings.color", "color_update", object)
    // renamejs.rename("test.rooms.name", "room_name", object)

    expect(object).toHaveProperty('test.name_update')
    expect(object).toHaveProperty('test.settings.color_update')

    // expect(object).toEqual(
    //   {
    //     test: {
    //       key: {
    //         in: {
    //           away: "hello"
    //         }
    //       }
    //     }
    //   }
    // )
  })
})
