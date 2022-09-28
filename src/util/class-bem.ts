export function withNamespace(namespace: string) {
  const bem = function bem(className: string = "") {
    if (className === "") {
      return namespace
    }
    return `${namespace}__${className}`
  }

  bem.is = function (className: string) {
    return `${this()}--${className}`
  }

  bem.block = function (className: string) {
    return withNamespace(this(className))
  }

  return bem
}

