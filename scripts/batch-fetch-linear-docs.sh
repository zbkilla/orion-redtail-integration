#!/bin/bash

# Linear Documentation Batch Fetcher
# This script systematically downloads all Linear documentation in markdown format

OUTPUT_DIR="./ai-docs"
BASE_URL="https://linear.app"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🚀 Linear Documentation Batch Fetcher"
echo "===================================="
echo ""

# Developer documentation pages
DEVELOPER_PAGES=(
  "graphql"
  "sdk"
  "oauth-2-0-authentication"
  "webhooks"
  "rate-limiting"
  "pagination"
  "errors"
  "filtering"
  "mutations"
  "subscriptions"
  "file-uploads"
  "integrations"
  "api-reference"
  "changelog"
)

# Product documentation pages
DOCS_PAGES=(
  "issues"
  "projects"
  "cycles"
  "views"
  "teams"
  "roadmap"
  "triage"
  "workflows"
  "labels"
  "estimates"
  "templates"
  "automations"
  "keyboard-shortcuts"
  "import"
  "export"
  "notifications"
  "preferences"
  "workspaces"
  "billing"
  "security"
  "data-privacy"
  "sso"
  "scim"
  "audit-logs"
  "linear-method"
)

# Method documentation pages
METHOD_PAGES=(
  "introduction"
  "principles"
  "practices"
  "workflows"
  "planning"
  "execution"
  "review"
  "team-structure"
  "issue-tracking"
  "project-management"
  "cycles-sprints"
  "roadmapping"
  "metrics"
  "automation"
  "integrations"
  "best-practices"
  "anti-patterns"
  "case-studies"
  "migration-guide"
)

# Function to fetch a documentation page
fetch_doc() {
  local section=$1
  local page=$2
  local url="${BASE_URL}/${section}/${page}.md"
  local output_file="${OUTPUT_DIR}/${section}-${page}.md"
  
  echo -n "📥 Fetching ${section}/${page}.md ... "
  
  if curl -s -f "$url" -o "$output_file" 2>/dev/null; then
    echo "✅ Success"
    return 0
  else
    echo "❌ Not found or error"
    rm -f "$output_file"  # Remove empty file if created
    return 1
  fi
}

# Track statistics
SUCCESS_COUNT=0
FAIL_COUNT=0

# Fetch developer documentation
echo "📚 Fetching Developer Documentation"
echo "-----------------------------------"
for page in "${DEVELOPER_PAGES[@]}"; do
  if fetch_doc "developers" "$page"; then
    ((SUCCESS_COUNT++))
  else
    ((FAIL_COUNT++))
  fi
  sleep 0.5  # Rate limiting delay
done

echo ""

# Fetch product documentation
echo "📚 Fetching Product Documentation"
echo "--------------------------------"
for page in "${DOCS_PAGES[@]}"; do
  if fetch_doc "docs" "$page"; then
    ((SUCCESS_COUNT++))
  else
    ((FAIL_COUNT++))
  fi
  sleep 0.5  # Rate limiting delay
done

echo ""

# Fetch method documentation
echo "📚 Fetching Method Documentation"
echo "-------------------------------"
for page in "${METHOD_PAGES[@]}"; do
  if fetch_doc "method" "$page"; then
    ((SUCCESS_COUNT++))
  else
    ((FAIL_COUNT++))
  fi
  sleep 0.5  # Rate limiting delay
done

echo ""
echo "===================================="
echo "📊 Summary"
echo "===================================="
echo "✅ Successfully downloaded: $SUCCESS_COUNT documents"
echo "❌ Failed/Not found: $FAIL_COUNT documents"
echo "📁 Output directory: $OUTPUT_DIR"
echo ""
echo "✨ Documentation fetch complete!"

# Create a summary file
SUMMARY_FILE="${OUTPUT_DIR}/FETCH_SUMMARY.md"
cat > "$SUMMARY_FILE" << EOF
# Linear Documentation Fetch Summary

**Date:** $(date)
**Total Pages Attempted:** $((SUCCESS_COUNT + FAIL_COUNT))
**Successfully Downloaded:** $SUCCESS_COUNT
**Failed/Not Found:** $FAIL_COUNT

## Downloaded Files

### Developer Documentation
EOF

# List downloaded developer docs
for page in "${DEVELOPER_PAGES[@]}"; do
  if [ -f "${OUTPUT_DIR}/developers-${page}.md" ]; then
    echo "- developers-${page}.md" >> "$SUMMARY_FILE"
  fi
done

cat >> "$SUMMARY_FILE" << EOF

### Product Documentation
EOF

# List downloaded product docs
for page in "${DOCS_PAGES[@]}"; do
  if [ -f "${OUTPUT_DIR}/docs-${page}.md" ]; then
    echo "- docs-${page}.md" >> "$SUMMARY_FILE"
  fi
done

cat >> "$SUMMARY_FILE" << EOF

### Method Documentation
EOF

# List downloaded method docs
for page in "${METHOD_PAGES[@]}"; do
  if [ -f "${OUTPUT_DIR}/method-${page}.md" ]; then
    echo "- method-${page}.md" >> "$SUMMARY_FILE"
  fi
done

echo ""
echo "📄 Summary saved to: $SUMMARY_FILE"