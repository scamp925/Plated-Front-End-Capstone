# Plated

[See Live Demo of Plated](https://drt-next-js-template.netlify.app/)

[MVP Walkthrough Video of Plated](https://www.loom.com/share/03426504f24b464fbf3173efa2a3dc09)

![plated](https://user-images.githubusercontent.com/98675776/189264541-3c4b2291-8177-4b83-9721-4f1f9705a794.png)

## Topics
- [So What Is Plated?](#so-what-is-plated)
- [Plated](#plated)
- [MVP Features](#mvp-features)
- [Stretch Features](#stretch-features)
- [Get Started](#get-started)
- [My Learning Corner](#learning-corner)
- [Planning for Plated](#planning-for-plated)
___
## So, What Is Plated?
Plated is where a recipe book meets a meal planner. Individual users are able to create, view, edit and delete recipes then with those recipes, users are able to plan out their week's dinners. 

Plated eases the burden of the all too common question of "What's for dinner?" with it's intuitive design for users wanting to plan all of their dinners for the week. Plated users pick their meals from their own recipes; thus, giving all Plated users a peace of mind knowing that dinner will be something they actually like. Plus, having all user's recipes in one place will help users remember what exactly they can make! Thanks to Plated, meal planning is made easy, so users can keep living their lives without the constant stress of trying to figure out what tonight's dinner will be. If this sounds good to you, Plated is what you have been looking for. Happy meal planning!
## Plated

[MVP Walkthrough Video of Plated](https://www.loom.com/share/03426504f24b464fbf3173efa2a3dc09)

### MVP Features

Recipes:
- Add a new recipe
- View snippet of all recipes associated to a specific user on recipes page
- View single recipe's detail by clicking "View Details" on snippet recipe card
- Edit single recipe by clicking "Edit" button on single recipe view. Recipe form will render on the DOM again, but this time with previous entries associated with the recipe ready for any updates
- Delete a single recipe by clicking "Delete" button on single recipe view. This recipe will be permanently deleted from Plated. **If recipe happens to be assigned a day of the week then deleted, that recipe will be removed from the day of the week as well once user returns to home page
- Search for a recipe by any part of its name on the recipes page. Click the "Reset Search" to avoid having to backspace the search entry.

Days of the Week Calendar:
- Choose a recipe from user's stored recipes for a specific day
- Two views of the day of the week card:
    - When a recipe has not been assigned to a day, an "Add" button renders in the center.
    - When a recipe has been assigned to a day, the snippet view of a recipe will render with a "Change Dinner" button and a "Clear Dinner" button.
- "Change Dinner" button brings the dinner form back with previous selection rendering ready to be changed to another meal.
- "Clear Dinner" button deletes the dinner entry, but not the recipe that was there. Once dinner entry is cleared, the day of the week card reverts back to an "Add" button in the center.
- "Clear the Week's Dinners" above the calendar of the week works like the "Clear Dinner" button except instead of clearing just one dinner entry, clicking this button will clear all dinner entries for the week. Great feature when it's time to sit down and plan the upcoming week's dinners.

General:
- All Plated users are authenticated at sign-in thanks to Google Firebase, so everything done by a user on Plated will never change anything on another user's view/account.

### Stretch Features

<em>CSS Update:</em>
- Changed the entire look and feel of Plated. Hello new color scheme and font!
[Plated's CSS Branch](https://github.com/scamp925/Plated-Front-End-Capstone/tree/css)
vs
[Plated's MVP Branch](https://github.com/scamp925/Plated-Front-End-Capstone/tree/plated-mvp)

![plated-mvp-vs-css](https://user-images.githubusercontent.com/98675776/190865384-b2401500-645a-42e1-b950-57f64f977df2.jpg)

<em>Dropdown select with search ability:</em>
- On the dinner form, users are now able to search for a recipe to select for dinner thanks to React Select's component AsyncSelect.

![searchable-dropdown-plated](https://user-images.githubusercontent.com/98675776/190864428-a6154232-f6e1-4d84-891e-ca205ceca68b.gif)
## Planning for Plated

#### ERD for Plated's MVP
![mvp-erd-plated](https://user-images.githubusercontent.com/98675776/189425881-3e240407-ff16-49ef-ad8c-895c557c8e04.png)

#### Screenshot of Wireframe for Plated - Desktop Version
![plated-wireframe](https://user-images.githubusercontent.com/98675776/189426940-3fccdab8-a6d8-40fb-9cd8-87ab9cdb2e02.png)

[Link to Figma for Plated's Wireframe](https://www.figma.com/file/InVac86MKqy9v3mHxYpQm3/Plated-Front-End-Capstone?node-id=0%3A1)

[Link to Github tickets for Plated - MVP](https://github.com/scamp925/Plated-Front-End-Capstone/issues?page=1&q=is%3Aissue+is%3Aclosed)
