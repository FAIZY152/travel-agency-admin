#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@gmail.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-123456}"
COOKIE_JAR="$(mktemp)"

cleanup() {
  rm -f "$COOKIE_JAR"
}
trap cleanup EXIT

assert_status() {
  local actual="$1"
  local expected="$2"
  local label="$3"

  if [[ "$actual" != "$expected" ]]; then
    echo "[FAIL] $label (expected $expected, got $actual)"
    exit 1
  fi

  echo "[PASS] $label"
}

echo "Running auth smoke tests against $BASE_URL"

# 1) Unauthenticated access must redirect to /login
UNAUTH_STATUS="$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/dashboard")"
if [[ "$UNAUTH_STATUS" != "307" && "$UNAUTH_STATUS" != "302" ]]; then
  echo "[FAIL] Unauthenticated dashboard access should redirect (got $UNAUTH_STATUS)"
  exit 1
fi
echo "[PASS] Unauthenticated dashboard access redirects"

# 2) Invalid credentials must be rejected
INVALID_LOGIN_STATUS="$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "content-type: application/json" \
  --data '{"email":"wrong@example.com","password":"invalid"}' \
  "$BASE_URL/api/auth/login")"
assert_status "$INVALID_LOGIN_STATUS" "401" "Invalid login is rejected"

# 3) Valid login should set auth cookie
VALID_LOGIN_STATUS="$(curl -s -o /dev/null -w "%{http_code}" \
  -c "$COOKIE_JAR" \
  -X POST \
  -H "content-type: application/json" \
  --data "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
  "$BASE_URL/api/auth/login")"
assert_status "$VALID_LOGIN_STATUS" "200" "Valid login succeeds"

if ! grep -q "travel_agency_admin_token" "$COOKIE_JAR"; then
  echo "[FAIL] Login did not persist JWT cookie"
  exit 1
fi
echo "[PASS] JWT cookie stored"

# 4) Authenticated dashboard must be accessible
AUTH_DASHBOARD_STATUS="$(curl -s -o /dev/null -w "%{http_code}" -b "$COOKIE_JAR" "$BASE_URL/dashboard")"
assert_status "$AUTH_DASHBOARD_STATUS" "200" "Authenticated dashboard access works"

# 5) Logout should clear session and re-protect dashboard
LOGOUT_STATUS="$(curl -s -o /dev/null -w "%{http_code}" -b "$COOKIE_JAR" -c "$COOKIE_JAR" -X POST "$BASE_URL/api/auth/logout")"
assert_status "$LOGOUT_STATUS" "200" "Logout succeeds"

POST_LOGOUT_STATUS="$(curl -s -o /dev/null -w "%{http_code}" -b "$COOKIE_JAR" "$BASE_URL/dashboard")"
if [[ "$POST_LOGOUT_STATUS" != "307" && "$POST_LOGOUT_STATUS" != "302" ]]; then
  echo "[FAIL] Dashboard should be protected after logout (got $POST_LOGOUT_STATUS)"
  exit 1
fi
echo "[PASS] Dashboard is protected after logout"

echo "Auth smoke tests passed"
