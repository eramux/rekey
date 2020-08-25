# rekey
This library enables you to quickly and efficiently modify object keys.

## Usage

```

import { rekey } from "rekey"

# Define a sample object
let object = {
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

# This will result in the settings -> name key being renamed into 'username'
rekey("settings.name", "username", object)

# rekey will automatically rename keys in object arrays
rekey("items.name", "material", object)

# It takes care to only change keys that exist
rekey("items.supported", "usable", object)



```

Since rekey does not copy the object, you won't have any unexpected memory spikes. It works by only modifying the reference recursively.
