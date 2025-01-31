// src/api/category/content-types/category/lifecycles.js

module.exports = {
  // Hook to run after a category is created
  async afterCreate(event) {
    const { result } = event;
    // Call a function to handle updating parent with this new child
    await updateParentWithChild(result);
  },

  // Hook to run after a category is updated
  async afterUpdate(event) {
    const { result } = event;

    // Call a function to handle updating parent with this new child
    await updateParentWithChild(result);
  },
};

async function updateParentWithChild(category) {
  if (category.parent?.count > 0) {
    // Fetch the parent category
    const categoryInfo = await strapi.entityService.findOne(
      "api::category.category",
      category.id,
      { populate: ["parent"] }, // Populate the children field
    );
    let parent = categoryInfo?.parent;
    if (!parent) return;
    parent = await strapi.entityService.findOne(
      "api::category.category",
      parent.id,
      { populate: ["children"] }, // Populate the children field
    );
    const addChildIfNone = (p, new_child) => {
      const children = p.children.map((child) => child.id);
      if (p.children.some((child) => child.id === category.id)) {
        return children;
      } else {
        return [...children, new_child];
      }
    };
    await strapi.entityService.update("api::category.category", parent.id, {
      data: {
        children: addChildIfNone(parent, category.id),
      },
    });
  }
}
