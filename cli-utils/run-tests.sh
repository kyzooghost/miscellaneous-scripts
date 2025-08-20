#!/bin/bash
set -e

# Generic test runner script for repository projects
# Configurable options - modify these for your project structure
TEST_ROOT_DIR="${TEST_ROOT_DIR:-projects}"
TEST_SCRIPT_PATTERN="${TEST_SCRIPT_PATTERN:-*/tests/run-tests.sh}"
EXCLUDE_PATTERN="${EXCLUDE_PATTERN:-*/vendor/*}"
PROJECT_TYPE="${PROJECT_TYPE:-Projects}"

source ./cli-utils/cli-ui-utils.sh

# Track timing
START_TIME=$(date +%s)

print_header "🧪 ${PROJECT_TYPE} Testing Suite"

# Find all test scripts and run them (excluding specified patterns)
FAILED_TESTS=""
TOTAL_TESTS=0
PASSED_TESTS=0

# Get list of all test scripts for progress tracking
TEST_SCRIPTS=($(find "$TEST_ROOT_DIR" -path "$TEST_SCRIPT_PATTERN" -not -path "$EXCLUDE_PATTERN" | sort))
TOTAL_TEST_SCRIPTS=${#TEST_SCRIPTS[@]}

if [ $TOTAL_TEST_SCRIPTS -eq 0 ]; then
  print_warning "No test scripts found in $TEST_ROOT_DIR matching pattern $TEST_SCRIPT_PATTERN"
  exit 0
fi

print_section "🚀 Running Tests for $TOTAL_TEST_SCRIPTS ${PROJECT_TYPE}"

CURRENT_TEST=1
for TEST_SCRIPT in "${TEST_SCRIPTS[@]}"; do
  PROJECT_DIR=$(dirname $(dirname "$TEST_SCRIPT"))
  PROJECT_NAME=$(basename "$PROJECT_DIR")
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  
  print_progress "$CURRENT_TEST" "$TOTAL_TEST_SCRIPTS" "$PROJECT_NAME"
  print_info "Executing: $TEST_SCRIPT"
  
  TEST_START_TIME=$(date +%s)
  
  # Capture test output but suppress it unless there's an error
  if TEST_OUTPUT=$("$TEST_SCRIPT" 2>&1); then
    TEST_END_TIME=$(date +%s)
    TEST_DURATION=$((TEST_END_TIME - TEST_START_TIME))
    print_success "Tests PASSED for $PROJECT_NAME (${TEST_DURATION}s)"
    PASSED_TESTS=$((PASSED_TESTS + 1))
  else
    TEST_END_TIME=$(date +%s)
    TEST_DURATION=$((TEST_END_TIME - TEST_START_TIME))
    print_error "Tests FAILED for $PROJECT_NAME (${TEST_DURATION}s)"
    echo -e "${RED}Test output:${NC}"
    echo "$TEST_OUTPUT"
    FAILED_TESTS="$FAILED_TESTS\n  • $PROJECT_NAME"
  fi
  
  CURRENT_TEST=$((CURRENT_TEST + 1))
done

# Calculate final statistics
END_TIME=$(date +%s)
TOTAL_DURATION=$((END_TIME - START_TIME))
FAILED_COUNT=$((TOTAL_TESTS - PASSED_TESTS))

print_header "📊 Test Suite Summary"

echo -e "${BOLD}📈 Statistics:${NC}"
echo -e "  Total projects tested: ${CYAN}${BOLD}$TOTAL_TESTS${NC}"
echo -e "  Projects passing: ${GREEN}${BOLD}$PASSED_TESTS${NC}"
echo -e "  Projects failing: ${RED}${BOLD}$FAILED_COUNT${NC}"
echo -e "  Total execution time: ${BLUE}${BOLD}${TOTAL_DURATION}s${NC}"
echo ""

if [ -n "$FAILED_TESTS" ]; then
  echo -e "${RED}${BOLD}💥 Failed Projects:${NC}"
  echo -e "$FAILED_TESTS"
  echo ""
  print_info "💡 To debug individual projects, run the test script directly:"
  print_info "   ./$TEST_ROOT_DIR/[project]/tests/run-tests.sh"
  echo ""
  exit 1
else
  print_success "All projects passed tests! 🎉"
  echo ""
  print_info "✨ Excellent! All $TOTAL_TESTS projects are working correctly."
fi
