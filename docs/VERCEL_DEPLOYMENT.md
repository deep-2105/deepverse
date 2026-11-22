# Vercel Deployment

The production site can be deployed from the connected GitHub repository.

## Git-based deployment

1. Confirm the intended production branch in the Vercel project settings.
2. Run `npm run build` locally.
3. Commit and push the reviewed changes to that branch.
4. Open the Vercel project and monitor the deployment created for the new commit.
5. Confirm the deployment status is **Ready** before sharing the production URL.

## Environment variables

Add required secrets and environment variables through Vercel project settings. Never commit tokens, API keys, or private credentials to the repository or expose them in browser-side code.

## Verification

After deployment, check the homepage, navigation, project links, resume download, contact links, and mobile layout on the production URL. A successful local build alone does not verify the deployed site.
