export const changeOrder = (story, moduleId, newOrder) => {
  let module = story.modules[moduleId];

  let otherModuleId = getOtherId(story, newOrder);
  let otherModule = Object.assign({}, story.modules[otherModuleId], {
    order: module.order
  });


  module = Object.assign({}, module, {
    order: otherModule.order
  });

  return Object.assign({}, story, {
    ...story.modules,
    [moduleId]: module,
    [otherModuleId] : otherModule
  });
};

export const getOtherId = (story, newOrder) => {
  let otherOrder = newOrder;

  let otherModuleId = Object.keys(story.modules).findIndex((otherModuleId, index, array) => {
    let otherModule = array[otherModuleId];
    return otherOrder == otherModule.order;
  });

  if (otherModuleId != -1){
    return otherModuleId;
  }
};
