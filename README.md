# Week 05 - To Do List Challenge

**Author:** Peter C. Matthews

This repository contains my submission for the [Master Coding](https://wearecodenation.com/2022/04/25/master-coding/) course at *CodeNation*.

## Brief

**The Challenge:**
Your challenge is to create a to-do list using React. This challenge is designed to test your React skills in making components, mapping data out, managing your state and receiving user input.

**Requirements:**
 - Your app must have more than one component.
 - Add items to the list.
 - Delete items from the list.
 - Check items as done.

**Stretch Goals:**
 - Edit items.
 - Archive items from the main list to a secondary list.

Visually this project is completely down to your choice! So get creative, and look around at existing to-do list applications, and designs

## Implementation

During the market research for this project, I came across the Microsoft ToDo App, and I liked the minimalist design, and inuitive usage of the site. It also looks an feels like it's made with Material UI, which was introduced to us as a potential library to look into, within Week 05. I chose to take this as an opportunity to deep dive into Material UI, and see how well I could mimic the look and feel of Microsoft's site.

As a persistence medium, I am using the Local Storage. I started off by writing a CRUD repo for LS variables, but I soon ran into problems with its implementation, so I reverted that feature, in favour of using the `useLocalStorage`, and `useReadLocalStorage` hooks from the `usehooks-ts` library. This replaced `useState` to create a state machine with a persistence layer, built in.

## Retrospective

Material UI is a blessing to use, but it does produce this very cut-and-paste website feel, similar to using Bootstrap with the default settings. At this point, we had not touched on Styled Components, and so although I was able to capitalise on many of the advanced features within MUI, I was not able to make it as polished as I would have liked.

Using Local Storage as a persistence medium was a challenge. There still are a few bugs that mean that the selected state of menu items don't correlate to user actions correctly. If I were to do this again, I'd want to use routing to pass a slug as a parameter, to ensure that the menus don't get cross-wired. I'd also switch out from using Local Storage, to something a bit more robust.
