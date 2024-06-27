# @applyft-web/template

## Description

`@applyft-web/template` is a template for creating new web projects. This package automatically copies the template files and installs the necessary dependencies.

## Installation

To use this template in a new project, follow these steps:

1. **Create and navigate to your new project directory:**

    ```
    mkdir my-new-project
    cd my-new-project
    ```
   or use terminal in your IDE for local blank project (copy of Gitlab repository)
<br/>
<br/>

2. **Run the template using npx:**

    ```
    npx @applyft-web/template
    ```
   note: if you install the template not for the first time, you may need to clean the npm cache before running the template again (to make sure that the latest version of the template is used):
   ```
   npm cache clean --force
   ```
   or install it locally and run init script:
   ```
   npm i @applyft-web/template
   npx ob-template-init
   ```

This process will copy the template files and install all necessary dependencies.

Important:
- The template files will be copied to the root of the project directory.
- All existing files in the project directory will be overwritten.
- **!!!** For using the template, you need to have a **`.npmrc`** file with auth token for the @applyft-web registry.

## Usage

1. **add .env.local file with basic variables. example:**
   ```
   SKIP_PREFLIGHT_CHECK = true
   GENERATE_SOURCEMAP = false
   FAST_REFRESH = false
   REACT_APP_ENV = development

   REACT_APP_PRODUCT_NAME = Geozilla
   REACT_APP_META_TITLE = Example of title
   REACT_APP_META_DESCRIPTION = Example of description
   REACT_APP_META_THEME_COLOR = #000000

   REACT_APP_API_URL = https://api.example.com
   REACT_APP_STRIPE_PK = pk_test_key
   REACT_APP_STRIPE_NAME = BrainBloom 1
   REACT_APP_AMPLITUDE_KEY = amplitude_key
   REACT_APP_GISMART_KEY = gismart_key
   REACT_APP_GISMART_DOMAIN = https://api-events.example.com/gismart-events
   REACT_APP_GISMART_AUTH_TOKEN = gismart_auth_token
   REACT_APP_LOCKER_STUDIO_DOMAIN = https://api-events.example.com
   REACT_APP_FB_PIXEL_ID = 123456789
   REACT_APP_ENABLE_PAYPAL = true
   REACT_APP_GOOGLE_MEASUREMENT_ID = G-TEST
   ```
2. **add and/or replace necessary images (or other resources) to the `public` folder**
   ```plaintext
   public
   ├── assets
   │   └── images
   │       ├── ...
   │       ├── ...
   │       └── ...
   ├── favicon.ico
   ├── index.html
   ├── logo192.png
   └── package.json
   ```

3. **cover the app with GlobalThemeProvider. Use one of the mounted themes or your custom theme (more info: [ui-components/GlobalThemeProvider](https://applyft-web.github.io/ui-components/?path=/story/core-globalthemeprovider--global-theme-provider-story-template))**
   ```
   <GlobalThemeProvider projectTheme={'Geozilla'}>
     ...
   </GlobalThemeProvider>
   ```



## Scripts

The package includes the following executable script:

- `copyTemplate.js` — Script that copies the template files and installs the dependencies.

