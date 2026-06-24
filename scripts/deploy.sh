#!/bin/bash
# scripts/deploy.sh — Build & deploy to Mikrus Cytrus.
#
# Wymaga:
#   - npm run build (zrobione przed wywołaniem skryptu, lub tutaj)
#   - SSH dostęp do Mikrusa (klucz w ~/.ssh/id_ed25519)
#   - NOPASSWD sudo dla komend rsync/cp/mv/rm na Mikrusie (skonfigurowane)
#
# Co robi:
#   1. Astro build → dist/
#   2. Sync dist/ → /cytrus/4zal.net/ via rsync over SSH
#   3. Bezpiecznie: nigdy nie nadpisuje plików specjalnych
#      (.well-known/, @user.php, *.asc, .htaccess)

set -euo pipefail

REMOTE="${REMOTE:-zal@100.90.168.116}"
TARGET_DIR="${TARGET_DIR:-/cytrus/4zal.net}"
LOCAL_DIST="${LOCAL_DIST:-dist}"

# Kolory
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}→ Sprawdzam wymagania...${NC}"

# 1. Build
if [ ! -d "$LOCAL_DIST" ]; then
  echo -e "${YELLOW}→ Buduję Astro...${NC}"
  npm run build
fi

if [ ! -d "$LOCAL_DIST" ]; then
  echo -e "${RED}❌ Brak katalogu $LOCAL_DIST po buildzie.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Build OK${NC}"

# 2. Wrzucamy pliki z dist/ do /cytrus/4zal.net/
#    Używamy ssh + sudo -u cytrus, bo rsync bezpośrednio przez cytrus wymagałby
#    jego klucza SSH (nie mamy). W zamian: rsync do /tmp na Mikrusie, potem
#    sudo -u cytrus rsync z /tmp do /cytrus/4zal.net/.

echo -e "${YELLOW}→ Upload przez SSH...${NC}"

STAGING="/tmp/4zal-net-staging-$$"

# rsync do /tmp na Mikrusie (jako zwykły user)
ssh "$REMOTE" "mkdir -p $STAGING"
rsync -az --delete \
  --exclude='.well-known/' \
  --exclude='@*' \
  --exclude='*.asc' \
  --exclude='.htaccess' \
  "$LOCAL_DIST/" "$REMOTE:$STAGING/"

# Przenosimy (jako cytrus) do /cytrus/4zal.net/
ssh "$REMOTE" "sudo -n -u cytrus rsync -a --delete \
  --exclude='.well-known' \
  --exclude='@*' \
  --exclude='*.asc' \
  --exclude='.htaccess' \
  $STAGING/ $TARGET_DIR/ && \
  sudo -n -u cytrus rm -rf $STAGING"

echo -e "${GREEN}✓ Deploy zakończony${NC}"

# 3. Weryfikacja cURL-em
echo -e "${YELLOW}→ Weryfikacja...${NC}"
sleep 2

echo ""
echo "T1: HTTPS 4zal.net/"
status=$(curl -sI https://4zal.net/ 2>/dev/null | head -1 | tr -d '\r')
echo "  $status"

echo "T2: HSTS"
hsts=$(curl -sI https://4zal.net/ 2>/dev/null | grep -i 'strict-transport' | tr -d '\r')
echo "  ${hsts:-MISSING}"

echo "T3: Webfinger chain"
wf=$(curl -sIL "https://4zal.net/.well-known/webfinger" 2>/dev/null | grep -i '^location' | head -1 | tr -d '\r')
echo "  ${wf:-MISSING}"

echo "T4: @karol.zalewski chain"
kk=$(curl -sIL "https://4zal.net/@karol.zalewski" 2>/dev/null | grep -i '^location' | head -1 | tr -d '\r')
echo "  ${kk:-MISSING}"

echo ""
echo -e "${GREEN}🎉 Gotowe! Sprawdź https://4zal.net${NC}"
