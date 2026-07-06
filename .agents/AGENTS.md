# Portfolio Project Rules

## Build Safety
- **NEVER** commit or push without running `npm run build` first and confirming zero errors.
- **NEVER** delete or overwrite a file without first reading its current contents to understand what exists.
- **NEVER** modify files you have not been explicitly asked to modify.
- When editing a file, change only what is necessary. Do not rewrite entire files unless explicitly instructed.
- If a build fails after your changes, fix the errors before proceeding. Do not leave the project in a broken state.

## Content & Copy Rules
- **Do NOT use em dashes** in any website copy. They look AI-written. Use commas, periods, or restructure the sentence instead.
- Do NOT name specific AI tools (e.g. Claude, Gemini, ChatGPT) in website copy. Keep AI references generic.
- Do NOT add new sections or pages unless explicitly asked. Only modify existing ones.
- Do NOT change personal information, project data, or blog content unless explicitly asked.
- Preserve the existing first-person, conversational tone in all copy.

## Technical Rules
- This is a Next.js 16 + Framer Motion + CSS Modules project. All styling uses CSS Modules, not Tailwind utility classes.
- Mobile-first approach. Test every change mentally at 375px first.
- Maintain existing component architecture. Do not refactor structure without approval.
- All interactive elements must have `whileTap` feedback for mobile touch devices.
- Use the project's design tokens from `globals.css` (e.g. `var(--accent)`, `var(--bg-card)`) instead of hardcoded colour values.
