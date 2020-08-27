<p align="center"><img width="100" src="https://raw.githubusercontent.com/eramux/rekey/master/resources/logo.png" alt="Vue logo"></p>


<h1 align="center">Rekey</h1>
A simple and performant zero dependency library that allows you to modify your object structure using references.

### Tests

| Statements                | Branches                | Functions                | Lines                |
| ------------------------- | ----------------------- | ------------------------ | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) |

## Installation

``` shell
npm i @eramux/rekey
```

## Usage

First we will need to create an object which will be passed to the rekey funcitons

``` ts
// Define a sample object
let data = {
  key1: "some string",
  settings: {
    name: "John",
    active: true
  },
  users: [
    {
      name: "Marie"
    },
    {
      name: "Steven",
      type: "Human"
    }
  ],
  items: [
    {
      name: "abs"
    },
    {
      name: "pvc",
      supported: false
    }
  ]
}
```
#### Rename key:
``` ts
import { renameKey } from "@eramux/rekey"

// Rename the settings -> name key to 'username'
renameKey(data, "settings.name", "username")
// -> {
//      ...
//      settings: {
//        username: "John"
//        active: true
//      }
//      ...
//    }

// It will automatically rename keys in object arrays
renameKey(data, "items.name", "material")
// -> {
//      ...
//      items: [
//        {
//          material: "abs"
//        }
//        ...
//     ]
//     ...
//    }

// It only changes keys that exist
renameKey(data, "users.type", "species")
// -> {
//      ...
//      users: [
//        {
//          name: "Marie"
//        },
//        {
//          name: "Steven",
//          species: "Human"
//        }
//     ]
//     ...
//    }
```
#### Rename key:
``` ts
// Delete a key nested deeply inside of the object or arrays
deleteKey(data, "users.name")
// -> {
//      ...
//      users: [
//        {},
//        {
//          species: "Human"
//        }
//     ]
//     ...
//    }
```


__Since rekey does not copy the object, you won't have any unexpected memory spikes. It works by only modifying the reference recursively.__


## Contributions

Any contributions are welcome! Please make sure to first file an issue so we can discuss the problem at hand and you don't create a PR that doesn't get pulled.
