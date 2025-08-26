#!/bin/bash

# Color definitions
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[0;33m'
readonly BLUE='\033[0;34m'
readonly CYAN='\033[0;36m'
readonly BOLD='\033[1m'
readonly NC='\033[0m' # No Color

# Utility functions for colored output
print_success() {
  echo -e "${GREEN}${BOLD}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}${BOLD}❌ $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_header() {
  echo ""
  echo -e "${CYAN}${BOLD}╔═══════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}${BOLD}║ $1${NC}"
  echo -e "${CYAN}${BOLD}╚═══════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

print_section() {
  echo ""
  echo -e "${CYAN}${BOLD}▶ $1${NC}"
}

print_progress() {
  echo -e "${BLUE}${BOLD}[$1/$2] Processing: ${CYAN}$3${NC}"
}

print_debug() {
  if [[ "$(echo "${LOG}" | tr '[:upper:]' '[:lower:]')" == "debug" ]]; then
    echo -e "${CYAN}🔍 DEBUG: $1${NC}"
  fi
}
