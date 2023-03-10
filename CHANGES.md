Initial cleanup improvements for quality / convention 💫

These changes are proposed to improve code quality by using commonly
used conventions. Documentation and relevant articles are provided
wherever possible. Feel free to comment and/or contest any changes as
you see fit.

* **_Change_ component name, filename, and filepath convention**
In other words, (1) match component names with their respective
filenames (as is convention). This makes clear which components
correspond to which files and introduces a more consistent convention.
Also, (2) change `WorkoutsComponent` to `WorkoutList`. Using the
plural name here may not differentiate it enough from its singular
counterpart. Finally, (3) optionally drop the "Component" suffix from
all names/filenames entirely. This:
  * reduces redundancy in filepaths (`src/components/Copyright.jsx` vs
  `src/components/CopyrightComponent.jsx`, proper casing and file
  extension and path all work as an implicit definition here. See
  [this documentation note](https://reactjs.org/docs/components-and-props.html#rendering-a-component))
  * inherently allows component names to be more concisely descriptive
* **_Remove_ extraneous imports (e.g. "react" and "style.css")**
In general, it is good practice to optimize imported code as it can
improve performance by reducing the bundle size. Even when importing
native code, thinking about only what is strictly necessary can
improve computational performance and code quality.
(1) `import React from "react";` can be safely omitted from files.
As of version 17 of React, it is no longer necessary to use this
legacy paradigm (especially in ".(j|t)sx" files, see
[this related React blog post](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)).
Moreover, (2) optionally replace `<React.Fragment />` with `<></>`
(essentially syntactical sugar that is more concise and eliminates the
need for an additional import. See [this related Medium article](https://medium.com/fasal-engineering/what-are-react-fragments-or-the-react-empty-tags-190253582905)).
Finally, (3) remove imports of "src/css/style.css" in all components
except "src/index.js". It is unnecessary to have root styles on both
parent and child components. However, later it may be worthwhile to
separate component styles and import them individually.
* **_Remove_ unused, boilerplate code**
Simply removed unused packages and code artifacts from the CRA default
template. (e.g. `@testing-library/*` and `web-vitals`)
* **_Change_ exports to consistent default export on assignment**
This (1) consolidates the export statement for components onto the
assignment line, which cleans up the code and makes refactoring easier
in the future.
