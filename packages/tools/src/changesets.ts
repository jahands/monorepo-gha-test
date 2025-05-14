import { cliError, isNotFoundError } from '@jahands/cli-tools'

import { z } from '@repo/zod'

export type PublishedPackage = z.infer<typeof PublishedPackage>
export const PublishedPackage = z.object({
	name: z.string(),
	version: z.string(),
})
export const PublishedPackages = z.array(PublishedPackage)

export async function getPublishedPackages(): Promise<PublishedPackage[]> {
	const runnerTemp = await z
		.string({ error: '$RUNNER_TEMP is not set' })
		.min(1, { error: '$RUNNER_TEMP is empty' })
		.parseAsync(process.env.RUNNER_TEMP)
		.catch((e) => {
			throw cliError(z.prettifyError(e))
		})

	const publishedPackagesPath = path.join(runnerTemp, 'published-packages.json')

	echo(chalk.dim(`Reading published packages from ${publishedPackagesPath}`))

	return fs
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
}
