/**
 * 最近的父级元素
 * @param context
 * @param componentName
 * @returns {*}
 */
export const findComponent = (context, componentName) => {
  if (!context || !componentName) return;

  let parent = context.$parent;
  while (parent) {
    if (parent.componentName !== componentName) {
      parent = parent.$parent;
    } else {
      return parent
    }
  }
  return false;
};

/**
 * 直接父级元素
 * @param context
 * @param componentName
 * @returns {*}
 */
export const findComponentDirect = (context, componentName) => {
    if (!context || !componentName) return;

    const parent = context.$parent;
    if (parent.componentName === componentName) {
        return parent;
    }
    return false;
};

/**
 * 所有父级元素
 * @param context
 * @param componentName
 * @returns {*}
 */
export const findComponents = (context, componentName) => {
  if (!context || !componentName) return;

  const parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.componentName === componentName) parents.push(parent);
    return parents.concat(findComponents(parent, componentName))
  }
  return parents;
};

/**
 * 所有children
 * @param context
 * @param componentName
 * @returns {*}
 */
export const findComponentChildrens = (context, componentName) => {
  if (!context || !componentName) return;

  return context.$children.reduce((components, child) => {
    if (child.componentName === componentName) components.push(child);
    const foundChilds = findComponentChildrens(child, componentName);
    return components.concat(foundChilds);
  }, []);
};

/**
 * 所有直接子元素
 * @param context
 * @param componentName
 * @returns {Int32Array | * | Uint32Array | T[] | Int8Array | Float64Array | BigUint64Array | Uint8Array | Int16Array | BigInt64Array | Float32Array | Uint8ClampedArray | Uint16Array}
 */
export const findComponentDirectChildrens = (context, componentName) => {
  if (!context || !componentName) return;
  return context.$children.filter(item => {
    // console.log(item,'contextcontext',item.componentName,componentName)
    return item.componentName === componentName
  })
};

/**
 * 所有兄弟元素
 * @param context
 * @param componentName
 * @returns {Int32Array | * | Uint32Array | T[] | Int8Array | Float64Array | BigUint64Array | Uint8Array | Int16Array | BigInt64Array | Float32Array | Uint8ClampedArray | Uint16Array}
 */
export const findBrothersComponents = (context, componentName) => {
  if (!context || !componentName) return;
  const component = context.$parent.$children.filter(item => {
    return item.componentName === componentName
  });
  // 当前元素的index
  const currentIndex = component.findIndex(item => {
    return item._uid === context._uid
  });
  // 去除当前元素
  component.splice(currentIndex, 1);
  return component;
};
