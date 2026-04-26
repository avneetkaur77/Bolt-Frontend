// ── Seed Phrase ──────────────────────────────────────────────────────────────

export const WORD_POOL = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
  "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
  "acoustic", "acquire", "across", "action", "actor", "actual", "adapt", "admit",
  "advance", "advice", "aerobic", "afford", "afraid", "again", "agent", "agree",
  "ahead", "aim", "airport", "aisle", "alarm", "album", "alcohol", "alert",
  "alien", "alley", "allow", "almost", "alone", "alpha", "already", "alter",
  "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor",
];

export function generateSeedPhrase() {
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 12);
}

export function buildShuffledOptions(phrase) {
  const extras = WORD_POOL.filter((w) => !phrase.includes(w)).slice(0, 6);
  return [...phrase.slice(0, 6), ...extras].sort(() => Math.random() - 0.5);
}

// ── Wizard steps ──────────────────────────────────────────────────────────────

export const STEPS = ["Generate", "Backup", "Verify", "Secure", "Done"];

// ── Backup tips ───────────────────────────────────────────────────────────────

export const BACKUP_TIPS = [
  {
    icon: "🔒",
    title: "Never share with anyone",
    desc: "Anyone with your phrase can steal all your funds permanently.",
  },
  {
    icon: "📝",
    title: "Write it on paper",
    desc: "Store it in multiple secure physical locations offline.",
  },
  {
    icon: "🚫",
    title: "Never store digitally",
    desc: "Screenshots, cloud storage, or email are all unsafe.",
  },
  {
    icon: "✅",
    title: "You're responsible",
    desc: "Bolt-Dev cannot recover your wallet if you lose this phrase.",
  },
];

// ── Wallet info tiles (shown on success screen) ───────────────────────────────

export const WALLET_INFO_TILES = [
  { label: "Balance", value: "0.00 ETH" },
  { label: "Network", value: "Ethereum" },
  { label: "Status", value: "✓ Active" },
  { label: "Type", value: "HD Wallet" },
];

// ── Password strength helper ──────────────────────────────────────────────────

/**
 * Returns a strength level (1–4) and a hint string for the given password.
 */
export function getPasswordStrength(password) {
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const longEnough = password.length >= 8;

  let level;
  if (longEnough && hasUpper && hasDigit && hasSymbol) level = 4;
  else if (longEnough && hasUpper && hasDigit) level = 3;
  else if (longEnough) level = 2;
  else level = 1;

  const hints = [
    "Too short",
    "Add uppercase & numbers for better security",
    "Add a symbol for strong password",
    "Strong password ✓",
  ];

  return { level, hint: hints[level - 1] };
}

export const STRENGTH_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-emerald-500",
];

// ── Dummy wallet address generator ────────────────────────────────────────────

export function generateDummyAddress() {
  return (
    "0x" +
    Array.from({ length: 40 }, () =>
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join("")
  );
}
