# vuex

# Overview

-- We've three mapping functions mapState, mapGetters, mapMutations,

-- we'll use mapMutations(['mutationName']) in methods object in a component

-- we'll use mapGetters(['getterName'])
and mapState(['stateName']) in computed object in a component

-- it's not always necessary to use getters. We can use getters if along with getting a state value we also need to do some calculation. If we only need a value we can only use mapState function too

-- we can also create aliases for the names either it is mutation or getters or state name in that case instead of passing an array to for example mapState(['']) we'll pass an object as mapState({
alias: 'stateName'
})

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
