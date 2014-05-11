#sandal-autowire

[![Build Status](https://travis-ci.org/marcusberner/sandal-autowire.png?branch=master)](https://travis-ci.org/marcusberner/sandal-autowire)


Sandal-autowire extends the [sandal](https://github.com/marcusberner/sandal) IOC container. It enables you to register all components in a folder. It is only compatible with node.js (No browser support).

## Installation

    $ npm install sandal-autowire

## Usage

Creating a container will return a `sandal` container with an additional `autowire` function.
The autowire function will require all .js and .json files in the provided directory recursively and register them in the container. If an existing sandal container is provided, the autowire function will be added to that container instead of creating a new one.

### Examples
```js
var sandal1 = require('sandal-autowire')();
sandal1.autowire('path to directory');

var sandal2 = new Sandal();
require('sandal-autowire')(sandal2);
sandal2.autowire('path to directory');
```

The behavior of each component can be controlled by adding configurations in a property named `autowire`. All configurations have default behaviors. Thus an autowire property is not required.

### Example
```js
module.exports.autowire = {
    type: 'service',
    name: 'myName',
    dependencies: ['dep1', 'dep2'],
    transient: true,
    groups: ['myGroup']
}
```

### Parameters
 * `type` - Resolve behavior. Valid options are 'object', 'service' and 'factory'. If not provided, functions will be registered as factories and non-functions will be registered as objects.
 * `name` - Name used for registering the component. Filename without extension is used if no name is provided. 
 * `dependencies` - Names of dependencies to inject. Names of arguments will be used if not provided.
 * `transient` - If set to true, component will have transient lifecycle. Default is singleton.
 * `groups` - Groups to add the component to.
 * `ignore` - If set to true, the component will not be registered.

## Filename conversion

Filenames named in 'param-case' format will automatically be converted to 'camelCase' format.

### Example

Filename ```final-frontier.js``` will be resolved as ```finalFrontier```
