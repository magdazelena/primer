![health](https://github.com/magdazelena/primer/actions/workflows/ci.yaml/badge.svg)
# Strapi Starter Next 14, Tailwind, Typescript and Strapi

This is a monorepo supported by NX.

## Getting Started

1. Clone the repository locally.

2. Run `setup` command to setup frontend and backend dependencies:

```bash
  nx setup
```

3. Next, navigate to your `/backend` directory and set up your `.env` file. You can use the `.env.example` file as reference:

```bash
HOST=localhost
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

4. Start your project by running the following command:

```bash
  nx build
  nx dev
```

You will be prompted to create your first admin user.

![admin-user](https://user-images.githubusercontent.com/6153188/231865420-5f03a90f-b893-4057-9634-9632920a7d97.gif)

Great. You now have your project running. Let's add some data.

## Seeding The Data

We are going to use our DEITS feature which will alow to easily import data into your project.

You can learn more about it in our documentation [here](https://docs.strapi.io/dev-docs/data-management).

In the backend directory we have our `seed-data.tar.gz` file. We will use it to seed our data.

1. If in the `backend` folder, run the following command to seed your data:

```bash
  nx seed
```

2. If in the `root` folder, run:

```bash
  nx seed backend
```

![after-import](https://user-images.githubusercontent.com/6153188/231865491-05cb5818-a0d0-49ce-807e-a879f7e3070c.gif)

This will import your data locally. Log back into your admin panel to see the newly imported data.

## Setting Up The Frontend

Next we need to switch to our `/frontend` directory and create our `.env` file and paste in the following.

```bash
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token
NEXT_PUBLIC_PAGE_LIMIT=6
NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN=your-form-submission-token
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337

```

Before starting our Next JS app we need to go inside our Strapi Admin and create two tokens that we will be using for **form submission** and displaying our **content**.

Inside your Strapi Admin Panel navigate to Settings -> API Tokens and click on the `Create new API Token`.

![api-tokens](https://user-images.githubusercontent.com/6153188/231865572-cebc5538-374c-4050-91cd-c303fae25a3d.png)

Here are our Token Settings

Name: Public API Token Content
Description: Access to public content.
Token duration: Unlimited
Token type: Custom

![permissions](https://user-images.githubusercontent.com/6153188/231865625-a3634d89-0f40-4a6d-a356-8f654abd88b9.gif)

Once you have your token add it to your `NEXT_PUBLIC_STRAPI_API_TOKEN` variable name in the `.env` file.

**Alternatively:** you can create a READ only Token that will give READ permission to all your endpoints.

In this particular project this is not an issue. Although the above is the recommended way, just wanted to show you this option here as well.

When creating a Token, just select the `Read-only` option from token type drop down.

<img width="1093" alt="create-read-only-token" src="https://github.com/strapi/nextjs-corporate-starter/assets/6153188/3ea6c029-b296-4bbc-a5ce-33eedac52a03">

Next create a token that will allow us to submit our form.

Name: Public API Form Submit
Description: Form Submission.
Token duration: Unlimited
Token type: Custom

In Permissions lets give the following access.

| Content              | Permissions |
| -------------------- | :---------: |
| Lead-Form-Submission |   create    |

Add your token to your `NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN` variable name in the `.env` file.

Once your environment variables are set you can start your frontend application by running `nx dev`.

You should now see your Next JS frontend.

![frontend](https://user-images.githubusercontent.com/6153188/231865662-d870051f-4503-4a01-bc6b-635c7c5ca40d.png)

## Start Both Projects Concurrently

We can also start both projects with one command using the `concurrently` package.

You can find the setting inside the `package.json` file inside the root folder.

```json
{
  "scripts": {
    "frontend": "nx dev frontend",
    "backend": "nx dev backend",
    "clear": "nx clear frontend",
    "setup": "yarn install",
    "dev": "yarn clear && concurrently \"yarn frontend\" \"yarn backend\""
  },
  "dependencies": {
    "concurrently": "latest"
  }
}
```

Go to the root folder and install the package, `yarn`
You can start both apps by running `nx dev`.

## Installing dependencies from root into projects

If you want to install external package, use:

```bash
  yarn add <package> --cwd <project name>
```

for example:

```bash
  yarn add react-router-dom --cwd frontend
```

If your dependency is being **shared** by the projects, make sure to install it into the `root` directly!

## More docs:

- Frontend [docs](./docs/frontend.md)

---

> note: This project was started with love by [Trecia](https://github.com/TreciaKS), [Daniel](https://github.com/malgamves) and [Paul](https://github.com/PaulBratslavsky). You can find the original [here](https://github.com/strapi/nextjs-corporate-starter/).
