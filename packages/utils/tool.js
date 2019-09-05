
// 最近的父级元素
export const findComponent = (context, componentName) => {
  if(!context || !componentName) return;

  let parent = context.$parent;
  while (parent){
    if(parent.componentName !== componentName){
      parent = parent.$parent;
    }else{
      return parent
    }
  }
  return false;
};

// 所有父级元素
export const findComponents = (context, componentName) => {
  if(!context || !componentName) return;

  let parents = [];
  let parent = context.$parent;
  if(parent){
    if(parent.componentName === componentName) parents.push(parent);
    return parents.concat(findComponents(parent, componentName))
  }
  return parents;
};

// 所有children
export const findComponentChildrens = (context, componentName) => {
  if(!context || !componentName) return;

  return context.$children.reduce((components, child) => {
    if(child.componentName === componentName) components.push(child);
    const foundChilds = findComponentChildrens(child, componentName);
    return components.concat(foundChilds);
  }, []);
};

// 所有直接子元素
export const findComponentDirectChildrens = (context, componentName) => {
  if(!context || !componentName) return;
  return context.$children.filter(item=>{
    // console.log(item,'contextcontext',item.componentName,componentName)
    return item.componentName === componentName
  })
};

// 所有兄弟元素
export const findBrothersComponents = (context, componentName) => {
  if(!context || !componentName) return;
  let component = context.$parent.$children.filter(item=>{
    return item.componentName === componentName
  });
  // 当前元素的index
  let currentIndex = component.findIndex(item=>{
    return item._uid === context._uid
  });
  // 去除当前元素
  component.splice(currentIndex, 1);
  return component;
};
