# Strapi plugin permissions – patterns from docs and suggestions

Based on [Create admin permissions from plugins](https://docs.strapi.io/cms/plugins-development/guides/admin-permissions-for-plugins) and [Server API](https://docs.strapi.io/cms/plugins-development/server-api).

## 1. Patterns from documentation

### 1.1 Server lifecycle exports (Server API)

- **Pattern**: `register`, `bootstrap`, and `destroy` are shown as **default exports** in TypeScript examples.
- **Doc example (bootstrap)**:
  ```ts
  const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => { ... };
  export default bootstrap;
  ```
- **Suggestion**: Use `export default bootstrap` (and `export default register` if you split) in server files so Strapi gets the same shape as in the docs. Your `server/src/index.ts` can keep importing and re-exporting in the plugin object.

### 1.2 Where to register admin permissions (admin permissions guide)

- **Pattern**: “Each individual permission has to be registered in the **bootstrap** function of your plugin” with `strapi.admin.services.permission.actionProvider.registerMany(actions)`.
- **Doc**: Only `registerMany(actions)` in **bootstrap** is shown; there is no example of `actionProvider.register()` in `register()`.
- **Suggestion**: Register **all** admin permission actions in **bootstrap** via `registerMany(actions)`. Do not use `actionProvider.register()` in `register()` for the same plugin; that can duplicate or confuse the Roles UI.

### 1.3 Action shape for Settings → Roles → Plugins

- **Pattern**: Each action is an object:
  - `section: 'plugins'`
  - `displayName`: label in the Roles UI
  - `uid`: unique id (e.g. `overview.access`, `sidebar.access`). In the admin this becomes `plugin::<pluginName>.<uid>`.
  - `pluginName`: must match `strapi.name` in the plugin’s `package.json`.
- **Optional**: `subCategory` for grouping; `aliases` for linking to content-manager actions.
- **Suggestion**: There is no global “list” of allowed actions in the docs; you **define** the list by what you pass to `registerMany(actions)`. Each action you register appears as a toggle under your plugin in Settings → Administration panel → Roles → [role] → Plugins.

### 1.4 Admin-side permission config (admin permissions guide)

- **Pattern**: Define a reusable config in the admin, e.g. `admin/src/permissions.ts`:
  ```ts
  const pluginPermissions = {
    accessOverview: [{ action: 'plugin::my-plugin.overview.access', subject: null }],
    accessSidebar:  [{ action: 'plugin::my-plugin.sidebar.access',  subject: null }],
  };
  export default pluginPermissions;
  ```
- **Convention**: `action` = `plugin::<pluginName>.<uid>` (same `uid` as on the server).

### 1.5 Using permissions in the admin

- **Menu link**: `addMenuLink({ ..., permissions: [pluginPermissions.accessOverview[0]] })` so the link is only visible when the user has that action.
- **Page**: Wrap the page in `<Page.Protect permissions={pluginPermissions.accessOverview}>` so direct URL access is also gated.
- **Custom**: Use `useRBAC(pluginPermissions)` and e.g. `allowedActions.canAccessSidebar` to show/hide UI.

### 1.6 Error handling in bootstrap

- **Pattern**: The docs do **not** show try/catch in bootstrap. If `registerMany` or other bootstrap code throws, Strapi will surface it and the app may not start.
- **Suggestion**: Do **not** swallow errors with an empty `catch`. Prefer:
  - Log the error (e.g. `strapi.log.error`, or `console.error` in development), and
  - Either rethrow so the failure is visible, or document that you intentionally continue so one plugin does not block others.

---

## 2. Which admin permissions to register (no “official list”)

The docs do **not** provide a single list of “allowed” permission names. You invent the **uid**s and **displayName**s that match your plugin’s features. Examples from the doc:

- `overview.access` – “Access the overview page”
- `sidebar.access` – “Access the content manager sidebar”

For your plugins, you can define:

- **Status Manager**
  - One permission for the **Status Manager tab + creating/editing statuses** (admin-only): e.g. `uid: 'main'`, `displayName: 'Access Status Manager'`. Use this for the menu link and the Status Manager page.
  - Optionally keep CRUD actions for the status content type (`status.create`, `status.read`, etc.) if you want them to appear in Roles; otherwise a single “Access Status Manager” is enough for “tab + create statuses = admin only”.
- **Product Actions**
  - One permission so the plugin **appears in Settings → Roles** and admins can see/edit it: e.g. `uid: 'use'`, `displayName: 'Use product actions'`. You can leave the sidebar panel **without** a permission check so “any user” can use it, and use this action only for visibility in the Roles tab.

---

## 3. Mapping your requirements to implementation

| Requirement | Implementation |
|-------------|----------------|
| Both plugins’ logic available to all users creating content | Do not gate the status field (edit/list) or the product-actions sidebar by permission; keep them usable by any admin user. |
| Status Manager tab + creating new statuses = admin only | Register one action (e.g. `main` / “Access Status Manager”). Use it in `addMenuLink` and wrap the Status Manager page in `Page.Protect`. |
| Product Actions sidebar = any user | Register one action so the plugin appears in Roles; do **not** require that permission for the sidebar panel (any user can use it). |
| Admin can display/edit plugin settings in Settings → Roles | Register at least one action per plugin in **bootstrap** with `registerMany(actions)`; the plugin section and toggles then appear under Plugins for each role. |

---

## 4. Checklist of changes (summary)

1. **Server bootstrap**
   - Use **default export** in `bootstrap.ts` (and optionally in `register.ts`) to match docs.
   - Add **error handling**: log errors; avoid empty catch so bootstrap does not “crash silently”.
2. **Status Manager**
   - Move all permission registration from `register.ts` into **bootstrap** with `registerMany(actions)`.
   - Add one action for the tab (e.g. `uid: 'main'`, “Access Status Manager”).
   - **Admin**: add `admin/src/permissions.ts` and use it in `addMenuLink` and `Page.Protect` on the Status Manager page.
3. **Product Actions**
   - Ensure **bootstrap** uses default export and logs errors (no silent catch).
   - Register one action (e.g. `uid: 'use'`, “Use product actions”) so the plugin appears in Roles; do not require it for the sidebar.
4. **Roles tab**
   - All actions you want to show and edit in Settings → Roles → Plugins must be registered in **bootstrap** via `registerMany(actions)`.
