# Advanced state manager for Strapi content

A Strapi plugin that enables more status variations for your content.

## Installation

```bash
npm install @primershop/strapi-plugin-status-manager
```

## Usage

1. Install the plugin in your Strapi project
2. The plugin will automatically register and provide additional status management functionality
3. Configure the plugin through the Strapi admin panel

## How it works
### Add custom statuses for your content
Just type in status in the input field and press "Add status" button

![](./docs/screenshots/add.PNG)

### Toggle visibility of your status
Press "Published" or "Unpublished" button to change the visibility of the content with assigned status.
Only "published" will be accessible on your frontend.

![](./docs/screenshots/visibility.PNG)

### Reorder statuses

This might be important for your flow of content creation and management.
You can use drag and drop tool and change order of the statuses. It will be reflected in the status dropdowns on your content pages.

| Before | After |
| ------ | ----- |
| ![](./docs/screenshots/reorder1.png) | ![](./docs/screenshots/reorder2.PNG) |

### Delete status

Upon deleting you will be prompted to choose replacement status.
All the content with deleted status will then be updated to have the replacement status.

![](./docs/screenshots/delete.PNG)

### On your content edit page

Status dropdown is available on the right side banner of your content page.

![](./docs/screenshots/on_content_page.PNG)

## License

MIT
