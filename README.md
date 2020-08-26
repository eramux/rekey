<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

# rekey
This library enables you to quickly and efficiently modify object keys.


## Installation

```
npm i @eramux/rekey
```

## Usage

```

import { renameKey, deleteKey } from "@eramux/rekey"

# Define a sample object
let data = {
  key1: "some string",
  settings: {
    name: "John",
    active: true
  },
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

/**
 * Using renameKey
 */

# This will result in the settings -> name key being renamed into 'username'
renameKey(data, "settings.name", "username")

# rekey will automatically rename keys in object arrays
renameKey(data, "items.name", "material")

# It takes care to only change keys that exist
renameKey(data, "items.supported", "usable")

/**
 * Using deleteKey
 */

# This will delete the key defined by the selector
deleteKey(data, "settings.name")

```

Since rekey does not copy the object, you won't have any unexpected memory spikes. It works by only modifying the reference recursively.
