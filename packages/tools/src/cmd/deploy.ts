import { Command } from '@commander-js/extra-typings'

import { getPublishedPackages } from '../changesets'

export const deployWorkersProductionCmd = new Command('deploy-workers-production')
	.description('Deploy Cloudflare Workers to production (based on changesets)')
	.action(async () => {
		const publishedPackages = await getPublishedPackages()

		// This technically includes all versioned packages (including non-Workers),
		// but that's fine because only Workers include a `deploy` package.json script.
		const filters = publishedPackages.flatMap((p) => ['-F', p.name]) satisfies string[]

		await $({
			verbose: true,
			env: {
				...process.env,
				FORCE_COLOR: '1',
			},
		})`turbo deploy ${filters}`
	})
