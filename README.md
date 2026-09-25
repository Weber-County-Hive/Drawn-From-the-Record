# The Utah Hive Comics

A static, mobile-friendly comics gallery built for GitHub Pages.

## Publish on GitHub Pages

1. Upload everything in this folder to a GitHub repository.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then click **Save**.

The site uses only HTML, CSS, and JavaScript. No build step is required.

## Add another comic

Place the image in `assets/`, then copy one of the `<article class="comic-card">` blocks in `index.html`. Update its image filename, title, caption, alt text, and `data-tags`.
