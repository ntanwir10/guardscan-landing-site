export interface InstallChannel {
  id: string;
  label: string;
  command: string;
  /** Only channels that are published today may render. Flip to true when the channel ships. */
  live: boolean;
}

export const INSTALL_CHANNELS: InstallChannel[] = [
  { id: "npm", label: "npm", command: "npm install -g guardscan", live: true },
  { id: "pnpm", label: "pnpm", command: "pnpm add -g guardscan", live: true },
  { id: "yarn", label: "Yarn", command: "yarn global add guardscan", live: true },
  { id: "bun", label: "Bun", command: "bun add -g guardscan", live: true },
  { id: "brew", label: "Homebrew", command: "brew install ntanwir10/tap/guardscan", live: false },
  { id: "scoop", label: "Scoop", command: "scoop install guardscan", live: false },
  { id: "winget", label: "WinGet", command: "winget install NaumanTanwir.GuardScan", live: false },
  { id: "choco", label: "Chocolatey", command: "choco install guardscan", live: false },
  { id: "pipx", label: "pipx", command: "pipx install guardscan-cli", live: false },
];

export const LIVE_INSTALL_CHANNELS = INSTALL_CHANNELS.filter((c) => c.live);
