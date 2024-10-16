# Frontend

Frontend is written in Next.js and retains the main features of the library.

## Stucture and file organisation

Main stucture of folders:

1. `/app` is the routes folder. Available routes are listed below.
2. `/components` stores the reusable components for other views and pages.
3. `/hooks` stores the custom React hooks
4. `/types` contains the types
5. `/utils` contains the reusable functions and non-renderable elements.

### Routes

Routes contain page views and layouts as well as views and components related to the domain of the route.

1. `/[slug]` - default page
2. `/blog` - articles and article views
3. `/products` - products and product views
4. `/creators` - creators and creator views

All routes contain subfolders for:

1. **Views** - elements of the pages that are complex enough to be stored seprate from the pages.
2. **Components** - smaller elements reusable between views and pages in the route and outside of it.
