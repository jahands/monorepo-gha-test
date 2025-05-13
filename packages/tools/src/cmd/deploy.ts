import { Command } from '@commander-js/extra-typings'
import { cliError, isNotFoundError } from '@jahands/cli-tools'

import { z } from '@repo/zod'

export const deployWorkersProductionCmd = new Command('deploy-workers-production')
	.description('Deploy Cloudflare Workers to production (based on changesets)')
	.action(async () => {
		const publishedPackagesPath = path.join(
			process.env.RUNNER_TEMP ?? './',
			'published-packages.json'
		)

		echo(chalk.dim(`Reading published packages from ${publishedPackagesPath}`))

		const publishedPackages = await fs
			.readFile(publishedPackagesPath, 'utf8')
			.then((s) => PublishedPackages.parse(JSON.parse(s)))
			.catch((e) => {
				if (isNotFoundError(e)) {
					throw cliError(`No published packages file found at: ${publishedPackagesPath}`)
				} else if (e instanceof z.ZodError) {
					throw new Error(`Failed to parse published packages: ${z.prettifyError(e)}`)
				}
				throw new Error(`Failed to parse published packages: ${e}`)
			})

		const filters = publishedPackages.flatMap((p) => ['-F', p.name]) satisfies string[]

		await $({
			verbose: true,
			env: {
				...process.env,
				FORCE_COLOR: '1',
			},
		})`turbo deploy ${filters}`
	})

const PublishedPackages = z.array(
	z.object({
		name: z.string(),
		version: z.string(),
	})
)
