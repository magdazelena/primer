import type { ServiceInstance } from "@strapi/types/dist/modules/documents/service-instance";
import type { ID } from "@strapi/types/dist/modules/documents";
import type { RelationInputValue } from "@strapi/types/dist/modules/documents/params/attributes/relations";
import type { DocumentID } from "@strapi/types/dist/modules/documents/params/attributes/id";

interface Category {
  id: number;
  name: string;
  slug: string;
  parent?: Category | null;
  children?: Category[];
  count?: number;
}

interface LifecycleEvent {
  params: {
    data: Partial<Category>;
  };
  result: Category;
}

export default {
  async beforeCreate(event: LifecycleEvent) {
    const { data } = event.params;
    if (data.name) {
      data.slug = data.name.toLowerCase().replace(/\s+/g, "-");
    }
  },

  async afterCreate(event: LifecycleEvent) {
    const { result } = event;
    await updateParentWithChild(result);
  },

  async beforeUpdate(event: LifecycleEvent) {
    const { data } = event.params;
    if (data.name) {
      data.slug = data.name.toLowerCase().replace(/\s+/g, "-");
    }
  },

  async afterUpdate(event: LifecycleEvent) {
    const { result } = event;
    await updateParentWithChild(result);
  },

  async afterDelete(event: LifecycleEvent) {
    const { result } = event;
    if (result.parent) {
      const categoryService = strapi.documents(
        "api::category.category",
      ) as unknown as ServiceInstance<"api::category.category">;
      const parent = await categoryService.findOne({
        documentId: result.parent.id.toString() as ID,
        populate: ["children"],
      });
      if (parent) {
        const childrenSet: RelationInputValue<"oneToMany"> = {
          set:
            parent.children
              ?.filter((child) => child.id !== result.id)
              .map((child) => ({ documentId: child.documentId })) || [],
        };
        await categoryService.update({
          documentId: parent.documentId.toString() as DocumentID,
          data: {
            children: childrenSet,
          } as any,
        });
      }
    }
  },
};

async function updateParentWithChild(category: Category): Promise<void> {
  if (
    category.parent &&
    typeof category.parent.count === "number" &&
    category.parent.count > 0
  ) {
    const categoryService = strapi.documents(
      "api::category.category",
    ) as unknown as ServiceInstance<"api::category.category">;
    // Fetch the parent category
    const categoryInfo = await categoryService.findOne({
      documentId: category.id.toString() as ID,
      populate: ["parent"],
    });
    let parent = categoryInfo?.parent;
    if (!parent) return;
    parent = await categoryService.findOne({
      documentId: parent.id.toString() as ID,
      populate: ["children"],
    });
    const addChildIfNone = (
      p: any,
      newChild: number,
    ): { set: { id: string }[] } => {
      const children =
        p.children?.map((child) => ({ id: child.id.toString() })) || [];
      if (p.children?.some((child) => child.id === category.id)) {
        return { set: children };
      }
      return { set: [...children, { id: newChild.toString() }] };
    };
    await categoryService.update({
      documentId: parent.id.toString() as ID,
      data: {
        children: addChildIfNone(parent, category.id),
      } as any,
    });
  }
}
