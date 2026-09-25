#!/usr/bin/env bash
# Contract tests for the CI and review settings changed by PR #7.
set -euo pipefail

SCRIPT_DIR="$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v yq >/dev/null 2>&1; then
  echo 'FAIL: yq v4 is required to parse the YAML configuration' >&2
  exit 1
fi

PASS_COUNT=0
FAIL_COUNT=0

check_equal() {
  local name="$1" expected="$2" actual="$3"
  if [ "$actual" = "$expected" ]; then
    echo "PASS: $name"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL: $name (expected $expected, got $actual)"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

azure_config="$REPO_ROOT/azure-pipelines.yml"
review_config="$REPO_ROOT/.coderabbit.yaml"

# Parsing the YAML keeps comments and similarly named nested keys from passing.
pr_trigger="$(yq -o=json -I=0 '.pr' "$azure_config")"
push_trigger="$(yq -o=json -I=0 '.trigger' "$azure_config")"
production_deployments="$(yq -o=json -I=0 '[.steps[] | select(.task == "AzureRmWebAppDeployment@4") | .inputs.WebAppName]' "$azure_config")"
auto_review_enabled="$(yq -o=json -I=0 '.reviews.auto_review.enabled' "$review_config")"
base_branches="$(yq -r '.reviews.auto_review.base_branches[]' "$review_config")"

# An absent, null, false, or branch-scoped pr trigger must all fail this check.
check_equal 'Azure disables all PR-triggered runs' '"none"' "$pr_trigger"
check_equal 'Azure still runs only for release branch pushes' '["release/*"]' "$push_trigger"
check_equal 'the production deployment is guarded by those triggers' '["bernardomondragon"]' "$production_deployments"
check_equal 'CodeRabbit automatic review remains enabled' 'true' "$auto_review_enabled"

# Compare the full set, since a broad regex could accidentally review other bases.
sorted_branches="$(printf '%s\n' "$base_branches" | LC_ALL=C sort)"
expected_branches="$(printf '%s\n' 'agentic-dev' 'develop' 'develop-.*' 'master' | LC_ALL=C sort)"
check_equal 'CodeRabbit reviews agentic-dev and the existing bases only' "$expected_branches" "$sorted_branches"

echo "$PASS_COUNT passed, $FAIL_COUNT failed"
[ "$FAIL_COUNT" -eq 0 ]
