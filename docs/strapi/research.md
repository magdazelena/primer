# Implementation plan

1. Register a Document Service middleware in register()
 - Intercept data operations at the Document Service layer (recommended in Strapi 5) to inspect/modify params and/or the result.
 - Links:
   - Document Service middlewares: https://docs.strapi.io/cms/api/document-service/middlewares
   - Where to register (register lifecycle): https://docs.strapi.io/cms/api/document-service/middlewares#where-to-register
 - Steps:
   1. server/src/register.ts – Add Document Service middleware via strapi.documents.use((context, next) => { … }):
      - Detect content types to which status filtering applies (e.g., via a local set or config).
      - Read the status filter from the plugin-scoped query params (plugins['primer-status-manager'].status). If present and not 'all', validate it (service call) and store a flag in context (e.g., context.state.statusFilter).
      - UNCLEAR: Confirm read actions to target (likely 'findMany', 'findOne', 'count' or similar). If uncertain, guard by checking typeof context.params?.filters etc.
      - ANSWER: https://docs.strapi.io/cms/api/document-service 
        - finOne() - `await strapi.documents('api::restaurant.restaurant').findOne({
  documentId: 'a1b2c3d4e5f6g7h8i9j0klm'
})` Find a document matching the passed documentId and parameters.
        - findMany() - Find documents matching the parameters
        - findFirst() - Find first document matching the parameters
        - count() - Count
   2. server/src/index.ts – No special plugin “content-manager” extension export. Ensure register is exported (already is).
   3. server/src/middlewares/status.ts – Do not use as a Koa/global middleware for content manager interception; keep only if needed for plugin’s own routes.

2. Apply filtering using pre-params modification or post-result transformation
 - If the status is modeled as a separate mapping (status-link) rather than a native attribute on target CTs, you can’t inject custom SQL joins at this layer; you either:
   - a) modify context.params.filters when status is a native relation/attribute (preferred, fully supported), or
   - b) post-filter the result after await next() using your status-link table if the CT lacks a native relation (functional but with a performance trade-off).
 - Links:
   - “Implementing a middleware” shows param adjustment and result modification: https://docs.strapi.io/cms/api/document-service/middlewares#implementing-a-middleware
   - Query Engine populate (joins abstraction): https://docs.strapi.io/cms/api/query-engine/populating
 - Steps:
   1. server/src/services/status.ts – Add:
      - getStatusByName(name): already present.
      - getDocumentIdsForStatus(uid, statusName): returns Set/documentId list from status-link for the uid+status.
   2. server/src/register.ts – Inside documents.use:
      - If status filter present and target CT has a first-class relation/field for status:
        - Modify context.params.filters to add the filter, then return await next().
      - Else (status only exists via status-link):
        - Pre-call: optionally record status in context.state.
        - Call const result = await next().
        - Post-call: filter result(s) by intersecting their documentIds with getDocumentIdsForStatus(uid, statusName).
        - Return filtered result; preserve pagination metadata if available. Note: This may require computing pagination after filtering. Mark as potential performance cost.

3. Scope and safety checks
 - Explanation: Ensure we only apply the middleware when needed and fail fast on invalid status.
 - Links:
   - Document Service middleware example shows context.uid and context.action scoping: https://docs.strapi.io/cms/api/document-service/middlewares#implementing-a-middleware
 - Steps:
   1. server/src/register.ts – Within strapi.documents.use:
      - Guard: if context.uid not in enabled content types, return next().
      - Validate status with service.isValidStatus(name). If invalid, either let it fall back to unfiltered or set a 400 at a higher layer; best is to fall back to unfiltered (admin-side UX expects list not to break).
      - UNCLEAR: Confirm whether plugin-scoped query params surface under context.params.plugins['primer-status-manager'].status for read operations.

4. Keep existing Admin UI and list endpoints unchanged
 - Explanation: Admin `StatusFilter` already writes plugins[primer-status-manager][status] to query; backend now consumes it without route overrides.
 - Links:
   - Aligns with content-manager continuing to serve content; plugin modifies via Document Service middleware.
 - Steps:
   1. admin/src/listView/StatusFilter.tsx – No changes required.
   2. server/src/controllers/list.ts – Keep as-is; optional for batch helpers. Not needed for content-manager interception anymore.

5. Do not use Koa/global or route middlewares for content-manager interception
 - Explanation: Strapi 5 recommends Document Service middlewares over global/route middleware for data-level interception. Avoid strapi.use() in bootstrap.
 - Links:
   - Where to register: https://docs.strapi.io/cms/api/document-service/middlewares#where-to-register
 - Steps:
   1. server/src/bootstrap.ts – Do not register global middleware for this purpose.
   2. server/src/middlewares/index.ts – Export only plugin-specific middlewares (if any) for plugin routes, not content-manager.

6. Performance considerations (when post-filtering results)
 - Explanation: Post-filtering can impact pagination/total counts; prefer native attribute-based filters if feasible.
 - Links:
   - Middleware result modification example (post-processing): https://docs.strapi.io/cms/api/document-service/middlewares#implementing-a-middleware
 - Steps:
   1. server/src/services/status.ts – Add a helper to fetch count for a uid+status (optional) to provide correct pagination if you do post-filtering.
   2. server/src/register.ts – If post-filtering, recompute meta.pagination (page, pageSize, pageCount, total) accordingly and return the correct shape used by Document Service for lists.

Open questions to resolve (no invention):
- UNCLEAR: Exact read action names in Document Service for list/single operations (so we can target context.action reliably).
- UNCLEAR: Exact params shape for read operations passed to Document Service middleware, particularly where plugin-scoped query params live (e.g., context.params.plugins['primer-status-manager']?).
- UNCLEAR: The expected response shape from Document Service for list endpoints when returned by the middleware (results/pagination or {data, meta}? Content-manager’s admin fetchers expect a specific shape).
- UNCLEAR: Whether content-manager always calls through Document Service in Strapi 5 for all reads (docs imply yes; confirm in types if needed).

ANSWERS:
Certainly! Here are answers to your questions, each with a brief explanation, a link to the relevant documentation, and a code snippet where possible. All information is strictly based on the provided knowledge sources.

---

### 1. Exact read action names in Document Service for list/single operations (for context.action targeting)

**Explanation:**  
The `context.action` property in Document Service middlewares reflects the method being called. For read operations, the action names are:

- `findOne` for fetching a single document
- `findMany` for fetching a list of documents

**Docs:**  
See the "Registering a middleware" section for example `context` objects, which show `action: "findOne"` and `action: "findMany"` for single and list operations respectively  
[Document Service API: Middlewares - Registering a middleware](https://docs.strapi.io/cms/api/document-service/middlewares#registering-a-middleware)

**Code snippet:**
```js
strapi.documents.use((context, next) => {
  if (context.action === 'findOne') {
    // Single document read logic
  }
  if (context.action === 'findMany') {
    // List documents read logic
  }
  return next();
});
```

---

### 2. Exact params shape for read operations in Document Service middleware (plugin-scoped query params)

**Explanation:**  
The `context.params` object contains the parameters passed to the Document Service method. For read operations, it includes properties like `filters`, `fields`, `populate`, `status`, `locale`, etc.  
The knowledge sources do not explicitly mention a `plugins` property or how plugin-scoped query params are structured within `context.params`. Therefore, it is unclear if or how `context.params.plugins['primer-status-manager']` would be present.

**Docs:**  
See the example `context` objects for `findOne` and `findMany` actions, which show the typical params shape:  
[Document Service API: Middlewares - Registering a middleware](https://docs.strapi.io/cms/api/document-service/middlewares#registering-a-middleware)

**Code snippet:**
```js
// Example params for findMany
{
  filters: { /* ... */ },
  status: "draft",
  locale: null,
  fields: ['name', 'description'],
  // No explicit plugins property shown in docs
}
```

---

### 3. Expected response shape from Document Service for list endpoints (middleware return value)

**Explanation:**  
When using the Document Service API directly (e.g., `findMany()`), the response is a plain array of documents, not an object with `{ data, meta }`.  
The `{ data, meta }` shape is used by the REST API, not by the Document Service API.  
If you return the result of `findMany()` from a middleware, it will be an array.

**Docs:**  
See the `findMany()` example response:  
[Document Service API - findMany()](https://docs.strapi.io/cms/api/document-service#findmany)

**Code snippet:**
```js
// Example response from findMany()
[
  {
    documentId: "a1b2c3d4e5f6g7h8i9j0klm",
    name: "Biscotte Restaurant",
    publishedAt: null,
    locale: "en"
    // …
  },
  // ...
]
```

---

### 4. Does content-manager always call through Document Service in Strapi 5 for all reads?

**Explanation:**  
The documentation states that in Strapi 5, core controllers and the `createCoreService` factory use the Document Service API instead of the Entity Service API. This implies that the Content Manager (which uses these services/controllers) will also go through the Document Service for all reads.

**Docs:**  
See the breaking change note:  
[Core service methods use the Document Service API](https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/core-service-methods-use-document-service)

**Quote:**  
> In Strapi 5, core controllers and the `createCoreService` factory use the Document Service API.

---

If you need further details or clarification, please specify which aspect you'd like to explore further!

## Research notes:
1. Plugin Middleware Registration
#### Question: How do plugins register middleware in Strapi 5?
Options to investigate:
- strapi.use() in bootstrap
- Middleware configuration in plugin config
- Route-specific middleware registration

### Answers:
Certainly! Here’s how plugins can use API middleware in Strapi 5, with direct references and code snippets from the official documentation:

---

### 1. How do plugins register middleware in Strapi 5?

**Plugins register middleware in the `register()` lifecycle method**. You should not use `strapi.use()` in `bootstrap` for registering middleware; instead, use the `register` phase. Example:

```js
// (plugin-root-folder)/strapi-server.js|ts
module.exports = {
  register({ strapi }) {
    strapi.documents.use((context, next) => {
      // your logic
      return next();
    });
  },
  // bootstrap({ strapi }) {},
  // destroy({ strapi }) {},
};
```
[Registering a middleware – Where to register](https://docs.strapi.io/cms/api/document-service/middlewares#where-to-register)

---

### 2. strapi.use() in bootstrap

**You should NOT use `strapi.use()` in `bootstrap` for registering middleware.** The documentation explicitly states that middleware must be registered in the `register()` lifecycle method, not in `bootstrap`. There is no example or recommendation to use `strapi.use()` in `bootstrap` for middleware registration in plugins.  
[Where to register](https://docs.strapi.io/cms/api/document-service/middlewares#where-to-register)

---

### 3. Middleware configuration in plugin config

**Plugin middlewares are exported in the plugin interface and can be referenced by name.** Example of exporting plugin middlewares:

```js
// ./src/plugins/my-plugin/server/middlewares/your-middleware.js
module.exports = async (ctx, next) => {
  console.log("your custom logic")
  await next();
};

// ./src/plugins/my-plugin/server/middlewares/index.js
const yourMiddleware = require('./your-middleware');
module.exports = { yourMiddleware };

// ./src/plugins/my-plugin/server/register.js
const middlewares = require('./middlewares');
module.exports = ({ strapi }) => {
  strapi.server.use(middlewares.yourMiddleware);
};
```
[Plugin middlewares](https://docs.strapi.io/cms/plugins-development/server-api#middlewares)

---

### 4. Route-specific middleware registration

**To apply middleware to specific routes in a plugin, add them in the route config:**

```js
// ./src/plugins/[plugin-name]/server/routes/index.js
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/[collection-name]",
      handler: "[controller].find",
      config: {
        middlewares: ["[middleware-name]"], // Use the correct naming convention
      },
    },
  ],
};
```
[Route middlewares](https://docs.strapi.io/cms/backend-customization/routes#middlewares)

---

If you need more details on naming conventions or configuration, see [Middlewares configuration](https://docs.strapi.io/cms/configurations/middlewares#naming-conventions).

2. Content Manager API Interception
### Question: Can plugins intercept content-manager API calls?
Options to investigate:
Middleware approach
Route override approach
Content-manager extension approach

### Answers:
Certainly! Here’s a focused answer based strictly on the provided knowledge sources:

---

### 1. Do I use middleware to intercept Content Manager calls? If not, what approach is recommended?

**You do not use traditional global or route middleware to intercept Content Manager calls.**  
Instead, the recommended approach in Strapi 5 is to use **Document Service middlewares**. These allow you to intercept and modify data operations (create, read, update, delete) for any content-type, including those managed by the Content Manager. This is similar to how plugins like i18n extend or modify the behavior of content operations.

> "You can implement [Document Service middlewares](https://docs.strapi.io/cms/api/document-service/middlewares) to control the data before it's sent to the Query Engine. The Query Engine can also use lifecycle hooks though we recommend you use Document Service middlewares unless you absolutely need to directly interact with the database."  
[Backend customization](https://docs.strapi.io/cms/backend-customization)

---

### 2. Documentation or examples on intercepting Content Manager API calls

To intercept Content Manager API calls, implement a Document Service middleware in your plugin’s `register` lifecycle. Example:

```js
const applyTo = ['api::article.article']; // or your content-type UID

strapi.documents.use((context, next) => {
  // Only run for certain content types
  if (!applyTo.includes(context.uid)) {
    return next();
  }

  // Intercept specific actions
  if (['create', 'update'].includes(context.action)) {
    context.params.data.fullName = `${context.params.data.firstName} ${context.params.data.lastName}`;
  }

  const result = await next();

  // Optionally modify the result before returning
  return result;
});
```
[Implementing a middleware](https://docs.strapi.io/cms/api/document-service/middlewares#implementing-a-middleware)

---

### 3. Intercepting and modifying the return value (like i18n)

**Yes, you can intercept and modify the return value using Document Service middlewares.**  
The middleware receives the context and can alter both the input parameters and the result returned to the client, just as the i18n plugin does for localization.

> "Document Service middlewares allow you to perform actions before and/or after a method runs."  
[Document Service API: Middlewares](https://docs.strapi.io/cms/api/document-service/middlewares)

Example (modifying the result):

```js
strapi.documents.use(async (context, next) => {
  // ... your logic before
  const result = await next();
  // Modify the result as needed
  result.customField = 'customValue';
  return result;
});
```
[Implementing a middleware](https://docs.strapi.io/cms/api/document-service/middlewares#implementing-a-middleware)

---

**Summary:**  
- Use Document Service middlewares to intercept and modify Content Manager operations.
- Register these in your plugin’s `register` lifecycle.
- You can both inspect/modify input and alter the returned data, similar to i18n’s approach.

If you need to see how the i18n plugin specifically implements this, you would need to review its source code, as the official docs do not provide a direct example. However, the middleware pattern above is the officially documented and recommended way in Strapi 5.

3. Query Modification API
Question: How to modify Strapi 5 queries to include custom joins?
Options to investigate:
Query builder API
Entity service modifications
Database query modifications

### Answers:
Here are answers to your questions based strictly on the provided Strapi 5 documentation:

---

### 1. How to modify Strapi 5 query objects to include custom joins

In Strapi 5, you do **not** manually write SQL joins. Instead, you use the `populate` parameter in the Query Engine API to fetch related data (the equivalent of joins). You can specify which relations to populate, and even nest populates for multi-level (multi-join) queries. For example:

```js
strapi.db.query('api::article.article').findMany({
  populate: {
    category: {
      populate: ['restaurants'],
    },
    author: true,
  },
});
```
This will fetch articles, their categories, the restaurants related to those categories, and the author—all in one query, using Strapi’s abstraction for joins  
[Populating with the Query Engine API](https://docs.strapi.io/cms/api/query-engine/populating).

---

### 2. Whether plugins can modify core API query structures

The knowledge sources do **not** explicitly mention a supported way for plugins to globally modify or inject custom SQL joins or alter the core query structure of Strapi’s APIs. Plugins can, however, use the Query Engine or Document Service APIs to build their own queries with custom populate logic, or implement [Document Service middlewares](https://docs.strapi.io/cms/api/document-service/middlewares) to intercept and modify data operations, but not to inject arbitrary SQL joins into core queries.

---

### 3. Strapi 5 query builder API for custom relationships

Strapi 5 provides the Query Engine API, which allows you to query and populate relationships using the `populate` parameter. You can specify single or multiple levels of relations, and even apply filters to nested relations. Example:

```js
strapi.db.query('api::article.article').findMany({
  populate: {
    relationA: {
      where: { name: { $contains: 'Strapi' } },
    },
    repeatableComponent: {
      select: ['someAttributeName'],
      orderBy: ['someAttributeName'],
      populate: { componentRelationA: true },
    },
    dynamiczoneA: true,
  },
});
```
This approach is the recommended and documented way to handle complex relationship queries in Strapi 5  
[Populating with the Query Engine API](https://docs.strapi.io/cms/api/query-engine/populating).

---

**Summary:**  
- Use the `populate` parameter in the Query Engine API for multi-level joins.
- Plugins cannot directly modify core API query structures for custom joins.
- The Query Engine API is the supported way to handle custom relationships and complex queries in Strapi 5.

4. Plugin Architecture
### Question: What's the correct way for plugins to extend core functionality?
Options to investigate:
Middleware registration
Service extensions
Controller overrides

### Answers
If you are developing a whole plugin in a separate repository (not as an extension inside `/src/extensions` of a Strapi project), the recommended way to extend core functionality is **not** through the `/src/extensions` mechanism. Instead, you should use the **plugin Server API** to add or override backend logic such as controllers, services, routes, policies, and middlewares within your plugin’s own `server` directory. 

Your plugin should export these customizations from its server entry point (e.g., `server/src/index.js|ts`), using the structure and APIs provided by Strapi for plugins. This allows your plugin to introduce new features or modify existing behavior in a reusable and distributable way, rather than patching or extending an existing plugin or the core directly.

> "A Strapi plugin can interact with both the back end and the front end of a Strapi application. The Server API is about the back-end part, i.e. how the plugin interacts with the server part of a Strapi application... you will be able to use the plugin interface."  
[Server API for plugins](https://docs.strapi.io/cms/plugins-development/server-api)

If you need to override or extend core content-types or logic, you do so by providing your own implementations in the plugin’s `controllers`, `services`, or other relevant folders, and registering them in your plugin’s server entry point. This is the standard and recommended approach for plugins developed as separate packages.

The `/src/extensions` approach is specifically for extending plugins or core functionality from within a Strapi project, not from a standalone plugin repository.  
[Plugins extension](https://docs.strapi.io/cms/plugins-development/plugins-extension)

If you need to interact with or modify core functionality from a plugin, use the plugin APIs and structure as described in the [plugin structure documentation](https://docs.strapi.io/cms/plugins-development/plugin-structure).