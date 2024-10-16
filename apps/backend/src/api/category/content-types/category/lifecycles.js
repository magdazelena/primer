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
  if (category.parent) {
    // Fetch the parent category
    const parent = await strapi.entityService.findOne(
      "api::category.category",
      category.parent.id,
      { populate: ["children"] } // Populate the children field
    );

    // If the parent exists and doesn't already contain this child
    if (parent && !parent.children.some((child) => child.id === category.id)) {
      // Add this category (child) to the parent's children field
      await strapi.entityService.update("api::category.category", parent.id, {
        data: {
          children: [...parent.children.map((child) => child.id), category.id], // Append this child
        },
      });
    }
  }
}
