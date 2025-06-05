import type { ServiceInstance } from '@strapi/types/dist/modules/documents/service-instance';
import type { ID } from '@strapi/types/dist/modules/documents';

interface Category {
  id: number;
  parent?: {
    id: number;
    count: number;
  };
  children?: Array<{ id: number }>;
}

interface LifecycleEvent {
  result: Category;
}

async function updateParentWithChild(category: Category): Promise<void> {
  if (category.parent && typeof category.parent.count === 'number' && category.parent.count > 0) {
    const categoryService = strapi.documents('api::product-category.product-category') as unknown as ServiceInstance<'api::product-category.product-category'>;
    // Fetch the parent category
    const categoryInfo = await categoryService.findOne({
      documentId: category.id.toString() as ID,
      populate: ['parent'],
    });
    let parent = categoryInfo?.parent;
    if (!parent) return;
    parent = await categoryService.findOne({
      documentId: parent.id.toString() as ID,
      populate: ['children'],
    });
    const addChildIfNone = (p: Category, new_child: number): { set: { id: string }[] } => {
      const children = p.children?.map((child) => ({ id: child.id.toString() })) || [];
      if (p.children?.some((child) => child.id === category.id)) {
        return { set: children };
      } else {
        return { set: [...children, { id: new_child.toString() }] };
      }
    };
    await categoryService.update({
      documentId: parent.id.toString() as ID,
      data: {
        children: addChildIfNone(parent, category.id),
      } as any,
    });
  }
}

module.exports = {
  // Hook to run after a category is created
  async afterCreate(event: LifecycleEvent): Promise<void> {
    const { result } = event;
    // Call a function to handle updating parent with this new child
    await updateParentWithChild(result);
  },

  // Hook to run after a category is updated
  async afterUpdate(event: LifecycleEvent): Promise<void> {
    const { result } = event;

    // Call a function to handle updating parent with this new child
    await updateParentWithChild(result);
  },
}; 