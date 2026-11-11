export interface InstallChannel {
  id: string;
  label: string;
  command: string;
  /** Only channels that are published today may render. Flip to true when the release ledger records the channel as verified. */
  live: boolean;
  /** Installs the standalone binary, which bundles Node.js. */
  standalone: boolean;
}

export const INSTALL_CHANNELS: InstallChannel[] = [
  { id: "npm", label: "npm", command: "npm install -g guardscan", live: true, standalone: false },
  { id: "pnpm", label: "pnpm", command: "pnpm add -g guardscan", live: true, standalone: false },
  { id: "yarn", label: "Yarn", command: "yarn global add guardscan", live: true, standalone: false },
  { id: "bun", label: "Bun", command: "bun add -g guardscan", live: true, standalone: false },
  // Current Homebrew refuses third-party tap formulae until they are trusted.
  { id: "brew", label: "Homebrew", command: "brew tap ntanwir10/tap && brew trust --formula ntanwir10/tap/guardscan && brew install ntanwir10/tap/guardscan", live: false, standalone: true },
  { id: "scoop", label: "Scoop", command: "scoop bucket add guardscan https://github.com/ntanwir10/homebrew-tap && scoop install guardscan", live: false, standalone: true },
  { id: "winget", label: "WinGet", command: "winget install NaumanTanwir.GuardScan", live: false, standalone: true },
  { id: "choco", label: "Chocolatey", command: "choco install guardscan", live: false, standalone: true },
  { id: "pipx", label: "pipx", command: "pipx install guardscan-cli", live: false, standalone: true },
];

export const LIVE_INSTALL_CHANNELS = INSTALL_CHANNELS.filter((c) => c.live);
export const LIVE_STANDALONE_CHANNELS = LIVE_INSTALL_CHANNELS.filter((c) => c.standalone);
