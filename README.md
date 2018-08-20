# tidy.surf

Before you begin

```
npm install -g nodemon
```

Running locally:

```
npm run dev
```

Running tests:

```
npm test
```

using watch mode in development

```
npm run test-watch
```

Lint:

`npm run lint`


Add new component to Semantic UI

```
Step 1: added file src/definitions/elements/<COMPONENT>.less
Step 2: updated src/semantic.less to import <COMPONENT>
Step 3: updated src/theme.config to include <COMPONENT>
Step 4: updated /tasks/config/admin/release.js to include <COMPONENT>
Step 5: updated /tasks/config/project/install.js to check <COMPONENT>
Step 6: updated /tasks/config/defaults.js to include <COMPONENT>
Step 7: run gulp build.
```