export default [
  {
    method: "PUT",
    path: "/update-content",
    handler: "content_controller.updateContentStatus",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/get-content-status",
    handler: "content_controller.getContentStatus",
    config: {
      policies: [],
      auth: false,
    },
  },
];
