# Create .env file and populate with settings
Param
(
        [Parameter(Mandatory=$true)]
        [string] $targetUrl,

        [Parameter(Mandatory=$true)]
        [string] $releaseNumber
)

# Execute smoke tests
nodist env (Get-Content .node-version)
nodist npm env (Get-Content .npm-version)

yarn run test:server "--url=$targetUrl"
if ($LastExitCode -ne 0) {
  Write-Output "Last exit code: $LastExitCode"
}
