---
name: update-resume
description: Regenerate the resume deliverables in src/assets (Resume En.pdf, Resume Es.pdf and Resume Bernardo Mondragon.zip) from Resume En.md and Resume Es.md, styled with Resume En.css, using the markdown2pdf MCP. Use when the user says "update resume", "update the resume", "regenerate the resume", "rebuild the resume", or asks to refresh the resume PDFs or zip.
---

# Update resume

Run every step below without asking the user for anything. Stop only when a step fails and you cannot fix the cause; then report the failing output.

Run commands from the repo root. The scripts live in `.claude/skills/update-resume/scripts/` and need Node 22.2+.

| Input | Output (overwritten every run, same file names) |
| --- | --- |
| `src/assets/Resume En.md` | `src/assets/Resume En.pdf` |
| `src/assets/Resume Es.md` | `src/assets/Resume Es.pdf` |
| `src/assets/Resume En.css` (both PDFs) | `src/assets/Resume Bernardo Mondragon.zip` (exactly the two PDFs) |

## 1. Prepare

```
node .claude/skills/update-resume/scripts/prepare.mjs
```

This rewrites the scope of `Resume En.css` for the renderer (see below) and records hashes of the three sources. It also moves the current `Resume En.pdf` and `Resume Es.pdf` aside, so the server writes the new PDFs under exactly those names. Then it writes the render job and prints JSON with `jobFile` and `mcpAddCommand`; keep them for the next steps.

## 2. Make sure the markdown2pdf MCP is registered

Run `claude mcp get markdown2pdf`. It must show `Args: -y markdown2pdf-mcp@2.3.0`. If the server is missing or registered differently, run `claude mcp remove markdown2pdf -s local` (skip it when nothing is registered) and then the `mcpAddCommand` from step 1. Keep it in local scope: the config lives in the user's Claude profile, not in the repo.

## 3. Render with the markdown2pdf MCP

- If the session has the MCP's tools, load `mcp__markdown2pdf__batch_create_pdf` with ToolSearch (`select:mcp__markdown2pdf__batch_create_pdf`), Read `jobFile`, and call the tool once with its `documents` and `sharedConfig` exactly as written. Do not edit `customCss` or the paths.
- If the tools aren't loaded (MCP tools load only when a session starts, so this happens right after step 2 added the server), run `node .claude/skills/update-resume/scripts/render-stdio.mjs`. It starts the same server and calls the same `batch_create_pdf` tool over stdio with the same job.

The result must report 2 successful documents written to `src/assets/Resume En.pdf` and `src/assets/Resume Es.pdf`. Go on to step 4 even if rendering failed, because step 4 is what restores the previous PDFs. The server's first run downloads Chrome for Testing and takes a few minutes.

## 4. Validate and finish

```
node .claude/skills/update-resume/scripts/finalize.mjs
```

It checks each new PDF:

- it was rendered from its markdown file;
- it was written to its own name, with no `-1.pdf` copy beside it;
- the markdown files and the stylesheet are unchanged since step 1;
- it is a PDF written after step 1;
- it uses the stylesheet's body and heading colors.

If any check fails, it puts the previous PDFs back and exits with an error. Otherwise it deletes the previous PDFs and overwrites the zip with exactly the two new PDFs. It then reads the zip back to confirm the entries match byte for byte and prints a PASS/FAIL line for every check. The exit code is 0 only when every check passes.

If step 1 reports `EBUSY` or `EPERM`, a PDF is open in a viewer. Tell the user to close it, then start again from step 1.

## 5. Look at the result

Read `src/assets/Resume En.pdf` and `src/assets/Resume Es.pdf`. Confirm the page images show the stylesheet's look (orange headings, shaded Tech Stack blocks) and the current wording of each markdown file.

## 6. Report

List the three files you overwrote and summarize the PASS lines. Do not commit or push unless the user asks.

## How the renderer differs from mdtoword.org

- **Selectors:** `Resume En.css` is a mdtoword.org theme, which scopes every rule to `.markdown-preview.pdf-<theme>`. The server renders the document inside `.content`, so `prepare.mjs` renames that scope and changes nothing else.
- **No external resources:** the server blocks network requests, so the stylesheet must not use `url(...)` (web fonts, images). It uses the generic `sans-serif`, `serif` and `monospace` families, which resolve to the system fonts.
- **Base styles:** the server's `default` theme and its own `pdf.css` load underneath the stylesheet. Anything `Resume En.css` leaves undefined comes from them, such as the rule under h1/h2 and the width of the blockquote border.
- **No overwriting:** the server never overwrites a file and writes `name-1.pdf` instead. That's why `prepare.mjs` moves the current PDFs out of the way first.
