#!/bin/bash

GITHUB_OUTPUT=./foo.txt

{
	echo "turbo_filters<<EOF"
	echo '[{"name":"example-worker-echoback","version":"0.2.6"},{"name":"my-worker","version":"0.2.6"},{"name":"@repo/eslint-config","version":"0.1.3"},{"name":"@repo/hono-helpers","version":"0.1.3"}]' |
		jq -r '[.[] | "-F \(.name)"] | join(" ")'
	echo "EOF"
} >>$GITHUB_OUTPUT
