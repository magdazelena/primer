# Status Manager

### Compatible with Strapi version 5^

This plugin replaces native Strapi functionality of draft and publish.

It is basically a collection type of "Status" which has it's own management interface outside of content type builder one.

## Structure

A `status` consist of following fields:
- `name` - being status name in plain text
- `published` - being boolean value of whether objects with this status are published (displayed in frontend)
- `order` - numeric value; statuses are ordered based on preferred administrative workflow

## Usage
### Creating new status
1. Go to status manager plugin in the menu
2. Type in new status name in the input field
3. Click "Add status"
4. Reorder statuses as you wish pressing `::` button

### Deleting a status
1. Press delete next to the status to delete
2. Pop-up with appear; select another status that will be replacing this one
3. All posts related to **deleted** status will now be related to **replaced** status
4. Order will be updated to take into account removed status

### Editing status
There is no direct way to edit status name. To do that, create a new status with the new name, delete wrong one and upon reassigning choose the new name. Reorder as you wish.

### Publishing a status
1. Next to your statuses is a `published` or `unpublished` label
2. Click on the label to toggle the publish state
3. Now all posts related to this status will change its published state

## Development notes

1. Published state is being filtered in lifecycle hook in the `/api/product/content-type/product/lifecycles.js`
2. All api calls related to the plugin are in the `status-manager/server` controllers and services - including the ones modifying the product object
3. Admin view has two components:
    - `StatusManager` which is the main view of the plugin with drag-and-drop list of statuses
    - `ProductStatusField` which is display toggle of the status change in the edit view. It is registered in `/admin/src/index.js`:
    ```
      app.getPlugin('content-manager').apis.addEditViewSidePanel([ProductStatusField]);
    ```
4. There is a discrepancy between `admin` and `server` in terms of application type. `Admin` uses `module` type, while `server` is in `commonjs`. **This is correct** and according to Strapi standard (#notMyFault)
5. When using the field in post type, use `statusName` as label instead of `status`, since status on its own seems to be forbidden in the core.

## How to modify

From backend root:
```
yarn install
yarn dev
```
Changes in the plugin cause Strapi to rebuild and restart itself, happy coding.

## TO-DOs:
1. TESTING
2. Streamline usage label (statusName vs status)