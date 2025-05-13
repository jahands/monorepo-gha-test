import { Command } from '@commander-js/extra-typings'
import { cliError, isNotFoundError } from '@jahands/cli-tools'

import { z } from '@repo/zod'

export const deployWorkersProductionCmd = new Command('deploy-workers-production')
	.description('Deploy Cloudflare Workers to production (based on changesets)')
	.action(async () => {
		const publishedPackages = await fs
			.readFile('./published-packages.json', 'utf8')
			.then((s) => {
				const maybePublishedPackages = PublishedPackages.safeParse(JSON.parse(s))
				if (!maybePublishedPackages.success) {
					throw cliError(
						`Failed to parse published packages: ${z.prettifyError(maybePublishedPackages.error)}`
					)
				}
				return maybePublishedPackages.data.packages
			})
			.catch((e) => {
				if (isNotFoundError(e)) {
					throw cliError('No published packages file found at ./published-packages.json')
				}
				throw e
			})

		const filters = publishedPackages.flatMap((p) => ['-F', p.name]) satisfies string[]

		await $`turbo deploy ${filters}`.verbose()
	})

const PublishedPackages = z.object({
	packages: z.array(
		z.object({
			name: z.string(),
			version: z.string(),
		})
	),
})
